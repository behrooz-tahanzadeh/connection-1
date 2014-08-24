function Dot(x,y,ctx)
{
	this.ctx = ctx;
	
	this.x = x;
	this.y = y;
	
	this.vx = Math.random()*2+0.4;
	this.vy = Math.random()*2+0.4;
	
	if((Math.random()-0.5)<0)	this.vx*= -1;
	if((Math.random()-0.5)<0)	this.vy*= -1;
	
	Main.Dots.push(this);
}//eoc




Dot.prototype.move = function()
{
	this.x += this.vx;
	this.y += this.vy;
	
	if(this.x>Main.pageW || this.x<0)
		this.vx*=-1;
	
	if(this.y>Main.pageH || this.y<0)
		this.vy*=-1;
	
	this.ctx.moveTo(this.x+Main.DotsRadius, this.y);
	this.ctx.arc(this.x,this.y,Main.DotsRadius,0,2*Math.PI);
};//eof