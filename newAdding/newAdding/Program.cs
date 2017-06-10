using System;
using System.Collections.Generic;
using System.IO;
using System.Web.Script.Serialization;

namespace newsAdding
{
    class Comment
    {
        public Comment(int id, string text)
        {
            Id = id;
            Text = text;
        }
        public int Id { get; set; }
        public string Text { get; set; }
    }

    class News
    {
        public News(int id, string name, List<Comment> comments, int raiting)
        {
            Id = id;
            Name = name;
            Comments = comments;
            Raiting = raiting;
            Favorite = false;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Comment> Comments { get; set; }
        public int Raiting { get; set; }
        public bool Favorite { get; set; }
    }

    class Program
    {
        static private List<Comment> SeedComments(int startingId)
        {
            var comments = new List<Comment>(5);
            for(int i = startingId; i < startingId + 5; i++)
            {
                comments.Add(new Comment(i, "Some random text and number" + rnd.Next(1,10000).ToString()));
            }

            return comments;
        }

        static Random rnd = new Random();
        static private List<News> SeedNews()
        {
            var news = new List<News>(15);
            
            for (int i = 0; i < 15; i++)
            {
                news.Add(new News(i + 1, "News" + (i + 1).ToString(), SeedComments(i * 5), rnd.Next(1,10)));
            }

            return news;
        }

        static void Main(string[] args)
        {
            var news = new List<News>();
            news = SeedNews();

            string jsonData = new JavaScriptSerializer().Serialize(news);

            string filePath = Path.GetDirectoryName(AppDomain.CurrentDomain.BaseDirectory);
            filePath = Directory.GetParent(filePath).FullName;
            filePath = Directory.GetParent(filePath).FullName;
            filePath = Directory.GetParent(filePath).FullName;
            filePath = Directory.GetParent(filePath).FullName;

            File.WriteAllText(filePath + "/data/newsList.json", jsonData);
        }
    }
}
