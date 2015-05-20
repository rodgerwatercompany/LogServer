using System;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;

namespace LogServerProject
{
    public class ClientObject
    {
        public TcpClient tcpclient;
        public int ID;
        public bool blogin;
        public string Username;

        public ClientObject(TcpClient tcp,int id)
        {
            blogin = false;
            tcpclient = tcp;
            ID = id;
        }

        public void Login(string username)
        {

            string day = DateTime.Now.ToString("yyyy-MM-dd");
            string time = DateTime.Now.ToString("HH:mm:ssss");

            Console.WriteLine(username + " 登入. " + day + " " + time);
            blogin = true;
            Username = username;
        }


    }
}
