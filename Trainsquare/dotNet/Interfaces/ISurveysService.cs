using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Surveys;

namespace Sabio.Services
{
    public interface ISurveysService
    {
        int Add(SurveyAddRequest model, int userId);
        void Update(SurveyUpdateRequest model, int userId);
        void Delete(int id);
        Surveys GetById(int id);
        Paged<Surveys> GetCurrentPaged(int pageIndex, int pageSize, int createdBy);
        Paged<Surveys> Search(int pageIndex, int pageSize, string query);
        Paged<Surveys> Pagination(int pageIndex, int pageSize);

    }
}