using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace DBServer
{
    class DBMain
    {
        static void Main(string[] args)
        {
            
            Console.WriteLine("Please keyin server ip want to build .");

            string ip = "";

            do
            {
                ip = Console.ReadLine();
            }
            while (!IsValidIP(ip));

            DBServer _dbServer = new DBServer(ip, 12000);
        } 
        
        /// <summary>
          /// 檢查ip正確性
          /// 範圍從1.0.0.0 to 255.255.255.255
          /// </summary>
          /// <param name="addr">欲驗證的ip位址</param>
          /// <returns></returns>
        static public bool IsValidIP(string addr)
        {

            //create our match pattern
            string pattern = @"^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}$";

            //create our Regular Expression object
            Regex check = new Regex(pattern);

            //boolean variable to hold the status
            bool valid = false;

            //check to make sure an ip address was provided
            if (addr == "")
            {

                //no address provided so return false
                valid = false;
            }
            else
            {
                //address provided so use the IsMatch Method
                //of the Regular Expression object
                valid = check.IsMatch(addr, 0);
            }

            //return the results
            if (!valid)
                Console.WriteLine("this ip format is Wrong,please key correct ip format.\n ex: 1.0.0.0 to 255.255.255.255 .");

            return valid;

        }
    }
}
