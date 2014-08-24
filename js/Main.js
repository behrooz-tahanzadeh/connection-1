Main = 
{
	canvas:false,
	canvasX:false,
	
	intervalTime:20,
	intervalID:-1,
		
	DotsRadius:5,
	Dots:[],
	Connections:[],
	
	pageW:0,
	pageH:0,
	
	help:true,
	
	BgOpacity:1,
	
	
	
	init:function()
	{
		this.canvas = jQuery('#drawingArea').eq(0);
		
		this.pageW = jQuery(window).width();
		this.pageH = jQuery(window).height();
		
		this.canvas.get(0).width = this.pageW;
		this.canvas.get(0).height = this.pageH;
		
		this.canvasX = this.canvas.get(0).getContext("2d");
		
		this.canvas.click(Main.canvasClick);
		
		jQuery("div#pp").click(Main.pp);
		
		this.intervalID = setInterval(this.loop, this.intervalTime);
		
		jQuery('input#tail').change(Main.tailChange);
	},
	
	
	
	
	tailChange:function(e)
	{
		Main.BgOpacity = this.value;
	},
	
	
	
	
	canvasClick: function(e)
	{
		if(Main.help)
		{
			Main.help = false;
			jQuery("div#help").remove();
		}
		
		var d = new Dot(e.pageX, e.pageY, Main.canvasX);
		
		var dl = (Main.Dots.length-1)*Math.random();
		if(dl==0 && Main.Dots.length>1) dl = 1;
		
		var isAnyConnection = false;
		
		for(var i=0; i<Main.Dots.length-1; ++i)
		{
			if(Math.random()<0.3)
			{
				new Connection(d,Main.Dots[i],Main.canvasX);
				isAnyConnection = true;
			}
		}
		
		if(!isAnyConnection && Main.Dots.length>2)
		{
			var i = (Main.Dots.length-1)*Math.random();
			i = parseInt(i);
			
			new Connection(d,Main.Dots[i],Main.canvasX);
		}
	},
	
	
	
	
	loop: function()
	{
		var ctx = Main.canvasX;
		
		ctx.fillStyle = "rgba(255,255,255,"+Main.BgOpacity+")";
		ctx.fillRect(0,0,Main.pageW, Main.pageH);
		
		
		ctx.beginPath();
		ctx.lineWidth = "1";
		
		for(var i=0; i<Main.Dots.length; ++i)
			Main.Dots[i].move();
		
		ctx.fillStyle = "Black";
		ctx.fill();
		
		for(var i=0; i<Main.Connections.length; ++i)
			Main.Connections[i].move();
		
		ctx.stroke();
	},
	
	
	
	
	pp: function()
	{
		if(Main.intervalID == -1)
		{
			Main.intervalID = setInterval(Main.loop, Main.intervalTime);
			jQuery(this).html('pasue');
		}
		else
		{
			clearInterval(Main.intervalID);
			Main.intervalID = -1;
			jQuery(this).html('play');
		}
	}
};//eo Main{}


jQuery(document).ready(function(){
	Main.init();
});