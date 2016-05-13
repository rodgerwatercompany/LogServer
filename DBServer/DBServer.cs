using System;
using System.Collections.Generic;
using System.Text;

using MySql.Data.MySqlClient;
using SimpleServer;
using LitJson;

namespace DBServer
{
    class DBServer : SimpleServer.SimpleServer
    {
        public DBServer(string ip,int port):base(ip,port)
        {

        }
        protected override void Operation(Client client, string msg)
        {
            try
            {
                JsonData jd = JsonMapper.ToObject(msg);

                if(jd.IsObject)
                {

                    string myBet = jd["MyBet"].ToString();
                    int drawing = int.Parse(jd["Drawing"].ToString());
                    string date = jd["DateTime"].ToString();

                    InsertGame5009(myBet, drawing, date);

                }
            }
            catch (Exception Ex)
            {
                print("Operation Exception " + Ex);
            }
        }
        static void InsertGame5009(string myBet, int drawing, string date)
        {
            string dbHost = "localhost";//資料庫位址
            string dbPort = "3309";
            string dbUser = "root";//資料庫使用者帳號
            string dbPass = "rodger1234";//資料庫使用者密碼
            string dbName = "test";//資料庫名稱

            string connStr = "server=" + dbHost + ";uid=" + dbUser + ";pwd=" + dbPass + ";database=" + dbName + ";Port=" + dbPort;
            MySqlConnection conn = new MySqlConnection(connStr);
            MySqlCommand command = conn.CreateCommand();
            conn.Open();

            string mycommand = string.Format("INSERT INTO `test`.`game5009` (`MyBet`,`Drawing`,`DateTime`) VALUES ('{0}',{1},'{2}');",
                myBet, drawing, date);

            command.CommandText = mycommand;

            command.ExecuteNonQuery();

            //Console.ReadLine();
            conn.Close();

        }

    }
}
