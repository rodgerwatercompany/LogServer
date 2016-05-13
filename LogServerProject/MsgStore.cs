using System;
using System.IO;

namespace Client
{
    public class MsgStore
    {

        static public void Store(string username,string gamescene,string msg)
        {
            
            string day = DateTime.Now.ToString("yyyy-MM-dd");
            string time = DateTime.Now.ToString("HH:mm:ssff");
            msg = time + " - " + msg + gamescene;
            
            //string path = @"C:\Users\rodger_chen\Documents\Others\NightMarket_Log";
            string path = @".\" + username ;

            if (!System.IO.Directory.Exists(path))
            {

                System.IO.Directory.CreateDirectory(path);

                if (!System.IO.Directory.Exists(path))
                    Console.WriteLine("CreateDirectory Failed !");
                else
                {
                    //Console.WriteLine("CreateDirectory Success !");


                    FileInfo file = new FileInfo(path + "/" + username + day + ".txt");

                    if (file.Exists)
                    {

                        file.Create();
                        Console.WriteLine("Create file Success !");
                    }
                }
            }

            using (FileStream fs = new FileStream(path + "/" + username + day +".txt", FileMode.Append))
            {
                using (StreamWriter sw = new StreamWriter(fs))
                {

                    sw.WriteLine(msg);
                }
            }
        }


    }
}
