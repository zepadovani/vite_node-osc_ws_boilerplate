
//configure IP and OSC port
~n = NetAddr("127.0.0.1", 3333);

//simple loop as a Routine
{
	inf.do({
		var num, note;

		note =rrand(36,72);
		num  = rrand(0.2,2);
		~n.sendMsg("/test", "somestring",num,note);

		rrand(0.2,2).wait; //wait time
	});
}.fork;


