function Connection(a,b,ctx)
{
	this.a = a;
	this.b = b;
	
	this.ctx = ctx;
	
	Main.Connections.push(this);
}//eoc




Connection.prototype.move = function()
{
	this.ctx.moveTo(this.a.x, this.a.y);
	this.ctx.lineTo(this.b.x, this.b.y);
};//eof
