using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Email
{
    public class EmailsAddRequest
    {
        [Required]
        public string HostEmail { get; set; }
        [Required]
        public string HostName { get; set; }
        [Required]
        public string ToEmails { get; set; }
        [Required]
        public string Subject { get; set; }
        [Required]
        public string Message { get; set; }
        [Required]
        public string MeetingUrl { get; set; }

    }
}
