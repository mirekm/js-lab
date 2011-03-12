/*!
 *  Linking Cable Experiment
 *  
 *  A sipmle simulation of rope hanging between two points.
 *
 *
 *  http://github.com/mirekm/jscable
 *  Copyright 2010, Mirek Mencel
 *
 */

var Cable = (function(canvas, startPoint, endPoint) {
    if (!startPoint)
        startPoint = {x: 5, y: 5, xv: 0, yv: 0};
    if (!endPoint)
        endPoint = {x: 100, y: 100, xv: 0, yv: 0};
    
    return {
        // Our playground
        _c2d: canvas.getContext("2d"),
        _canvas: canvas,
        
        // Physics
        _gravity: 10,
        _elasticity: .3,
        _friction: .2,
        _segments: 8,
        
        // Some current physics properties
        _realSegments: null,
        _realFriction: null,
        _realGravity: null,
        
        // A -- B
        _startPoint: startPoint,
        _endPoint: endPoint,
        
        initialize: function()
        {
            this._c2d.lineWidth = 2;
            this._c2d.strokeStyle = "#000000";
            this.updatePhisics();
            
            var segments = this._segments;
            var xv = ((this._endPoint.x - this._startPoint.x)/segments) || 0;
            var yv = ((this._endPoint.y - this._startPoint.y)/segments) || 0;
            var point = this._startPoint;
            while ((--segments) > 0) {
                point = this.addPoint(point, xv, yv);
            }
            
            point = this.addPoint(point, xv, yv);
            point.nextPoint = this._endPoint;
            
        },
        
        addPoint: function(prevPoint, xv, yv) 
        {
            var p = {yv: 0, xv: 0, prevPoint: prevPoint, y: prevPoint.y + yv, x: prevPoint.x + xv};
            prevPoint.nextPoint = p;
            return p;
        },
        
        updatePhisics: function()
        {
            this._realSegments = this._segments * 2 + 1;
            this._realFriction = 1 - this._friction;
            this._realGravity = this._gravity / this._realSegments;
        },
        
        redraw: function() 
        {
            // Recalculate coordinates for each segment
            var point = this._startPoint.nextPoint;
            while (point.nextPoint) {
                // Calculate new vector
                this.updateVectors(point);
                // Move point
                point.x += point.xv;
                point.y += point.yv;
                // Go to the nextPoint point
                point = point.nextPoint;
            }
            
            this._c2d.clearRect(0, 0, this._canvas.width, this._canvas.height);
            this._c2d.lineWidth = 4;
            this._c2d.strokeStyle = "#5b5b5b";
            this._c2d.beginPath();
            this._c2d.moveTo(this._startPoint.x, this._startPoint.y);
            this.drawCurves();
            this._c2d.stroke();
            this._c2d.closePath();
            
            this._c2d.lineWidth = 2;
            this._c2d.strokeStyle = "#CCCCCC";
            this._c2d.beginPath();
            this._c2d.moveTo(this._startPoint.x, this._startPoint.y);
            this.drawCurves();
            this._c2d.stroke();
            this._c2d.closePath();
        },
        
        drawCurves: function()
        {
            var p = this._startPoint;
            
            var lineNum = 0;
            while (p.nextPoint) 
            {
                this._c2d.quadraticCurveTo(p.x, p.y, (p.nextPoint.x + p.x) / 2, (p.nextPoint.y + p.y) / 2 );
                p = p.nextPoint;
                lineNum++;
            }
            this._c2d.lineTo(p.x, p.y);
        },
        
        updateVectors: function(point)
        {
            // We're hitting the mid-point between two consecutive points
            var middleX = ( point.prevPoint.x + point.nextPoint.x ) / 2;
            var middleY = ( point.prevPoint.y + point.nextPoint.y ) / 2;
            
            // New position and velocity for the point
            point.xv += ( middleX - point.x ) * this._elasticity;
            point.yv += ( middleY - point.y ) * this._elasticity + this._realGravity;
            point.xv *= this._realFriction;
            point.yv *= this._realFriction;
        },
        
        setEndPoint: function(x, y)
        {
            this._endPoint.x = x;
            this._endPoint.y = y;
        },
        
        setStartPoint: function(x, y)
        {
            this._startPoint.x = x;
            this._startPoint.y = y;
        }
    }
});

