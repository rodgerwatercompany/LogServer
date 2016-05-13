using System;
using System.Net.Sockets;

namespace LogServerProject
{
    public class ClientObject
    {
        public TcpClient tcpclient;
        public int ID;
        public bool blogin;
        public string Username;
        public string gameScene;

        public ClientObject(TcpClient tcp,int id)
        {
            blogin = false;
            tcpclient = tcp;
            ID = id;
        }

        public void Login(string username)
        {
            string day = DateTime.Now.ToString("yyyy-MM-dd");
            string time = DateTime.Now.ToString("HH-mm-ssff");

            Console.WriteLine(username + " 登入. " + day + " " + time);
            blogin = true;

            if (username == "LNBTime")
            {
                Username = "Login " + day + " " + time;
            }
            else
            {

                char[] remove = new char[] { ':', '\\', '/', '*', '?', '"', '<', '>', '|' };

                for (int i = 0; i < remove.Length; i++)
                    username = username.Replace(remove[i], ' ');

                Username = username;
            }
        }
        public void GameScene(string gamescene)
        {
            
            string day = DateTime.Now.ToString("yyyy-MM-dd");
            string time = DateTime.Now.ToString("HH-mm-ssff");

            Console.WriteLine(Username + " 正在玩" + gameScene + " " +  day + " " + time);

        }
    }
}