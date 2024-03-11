
//1. configure IP and OSC port to SEND MESSAGES
~n = NetAddr("127.0.0.1", 3333); //sending port

//2. routine to send messages in loop
(
~sendRoutine = Routine({
	inf.do({
		var num, note;

		note =rrand(36,72);
		num  = rrand(0.2,2);
		~n.sendMsg("/test", "somestring",num,note);

		rrand(0.2,2).wait; //wait time
	});
});
~sendRoutine.play();
);

//3. configure OSC port to RECEIVE MESSAGES
//obs: thhis is just a way to be able to print any incoming message (which OSCdef does not allow)
//refer to OSCdef to match incoming messages for practical use!
(
{
thisProcess.openUDPPort(4444); //listening port
~receiveFunction = { |msg, time, replyAddr, recvPort|
		msg.postln;
};
thisProcess.addOSCRecvFunc(~receiveFunction);
}.fork;
);



// 4. stop sending
~sendRoutine.stop();

// 5. stop receiving/posting
thisProcess.removeOSCRecvFunc(~receiveFunction);