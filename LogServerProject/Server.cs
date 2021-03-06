﻿using System;
using System.Text;
using System.Net.Sockets;
using System.Threading;
using System.Net;

using Client;

namespace LogServerProject
{
    public class Server
    {
        private TcpListener tcpListener;
        private Thread listenThread;

        private int cnt_id;
        public Server(string ip)
        {
            cnt_id = 0;
            Console.WriteLine("Initial Server ...");
            Console.WriteLine("Build " + ip);

            //IPAddress localAddr = IPAddress.Parse("192.168.152.205");
            IPAddress localAddr = IPAddress.Parse(ip);
            this.tcpListener = new TcpListener(localAddr, 13000);
            this.listenThread = new Thread(new ThreadStart(ListenForClients));
            this.listenThread.Start();

            Console.WriteLine("Build Server Success !");
        }

        private void ListenForClients()
        {
            this.tcpListener.Start();

            while (true)
            {
                //blocks until a client has connected to the server
                TcpClient client = this.tcpListener.AcceptTcpClient();

                //create a thread to handle communication 
                //with connected client
                Thread clientThread = new Thread(new ParameterizedThreadStart(HandleClientComm));
                clientThread.Start(client);
            }
        }

        private void HandleClientComm(object client)
        {
            ClientObject clientObj = new ClientObject((TcpClient)client, cnt_id++);
            //TcpClient tcpClient = (TcpClient)client;
            NetworkStream clientStream = clientObj.tcpclient.GetStream();

            byte[] message = new byte[4096];
            int bytesRead;

            while (true)
            {
                bytesRead = 0;

                try
                {
                    //blocks until a client sends a message
                    bytesRead = clientStream.Read(message, 0, 4096);
                }
                catch
                {
                    //a socket error has occured
                    break;
                }

                if (bytesRead == 0)
                {
                    //the client has disconnected from the server
                    break;
                }

                //message has successfully been received
                ASCIIEncoding encoder = new ASCIIEncoding();
                string str_msg = encoder.GetString(message, 0, bytesRead);

                //Console.WriteLine("收到 " + clientObj.ID + str_msg);
                if (clientObj.blogin)
                {
                    Operation(clientObj.Username, clientObj.gameScene, str_msg);
                }
                else
                {
                    if (str_msg.Contains("Login Username:"))
                    {
                        string str_username = str_msg.Substring(15);

                        if (!string.IsNullOrEmpty(str_username))
                        {
                            clientObj.Login(str_username);
                        }
                    }
                    else if(str_msg.Contains("Login GameScene:"))
                    {
                        string str_gamescene = str_msg.Substring(16);

                        if (!string.IsNullOrEmpty(str_gamescene))
                        {
                            clientObj.GameScene(str_gamescene);
                        }
                    }
                }
                
            }
            clientObj.tcpclient.Close();

            string day = DateTime.Now.ToString("yyyy-MM-dd");
            string time = DateTime.Now.ToString("HH:mm:ssff");
            Console.WriteLine("Client id " + clientObj.ID + "中斷連線. " + day  + " " + time);
            clientObj.tcpclient = null;
            clientObj = null;
        }

        void Operation(string username,string gamescene,string msg)
        {
            MsgStore.Store(username, gamescene, msg);
        }
    }
}
