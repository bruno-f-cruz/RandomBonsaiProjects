import random
import sys
import time
import zmq

port_pub = 5557
port_sub = 5556

context = zmq.Context()
pub = context.socket(zmq.PUB)
pub.bind("tcp://*:%s" % port_pub)
sub = context.socket(zmq.SUB)
sub.connect("tcp://localhost:%s" % port_sub)
topic = "secret"
sub.setsockopt_string(zmq.SUBSCRIBE, topic)


while True:
    topic = random.randrange(9999, 10005)
    messagedata = random.randrange(1, 215) - 80
    print(f"{topic} {messagedata}")
    pub.send_string(f"{topic} {messagedata}")
    time.sleep(1)
    string = sub.recv()
    print(string)
