using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Surveys;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class SurveysService : ISurveysService
    {
        IDataProvider _data = null;
        IUserMapper _userMapper = null;
        ILookUp _lookMapper = null;

        public SurveysService(IDataProvider data, IUserMapper mapper, ILookUp lookMapper)
        {
            _data = data;
            _userMapper = mapper;
            _lookMapper = lookMapper;
        }

        public int Add(SurveyAddRequest model, int userId)
        {
            string procName = "[dbo].[Surveys_Insert]";
            int id = 0;

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col, userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;
                col.Add(idOut);
            },
            returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;

                int.TryParse(oId.ToString(), out id);
            });
            return id;
        }

        public void Update(SurveyUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Surveys_Update]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col, userId);
                col.AddWithValue("@Id", model.Id);
            },
            returnParameters: null);
        }

        public void Delete(int id)
        {

            string procName = "[dbo].[Surveys_Delete_ById]";

            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection paramCollection)
            {

                paramCollection.AddWithValue("@id", id);

            });

        }

        public Surveys GetById(int id)
        {
            string procName = "[dbo].[Surveys_Select_ByIdV2]";
            Surveys surveys = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
             {
                 int startidx = 0;
                 surveys = MapSurveys(reader, ref startidx);
             });
            return surveys;
        }

        public Paged<Surveys> GetCurrentPaged(int pageIndex, int pageSize, int createdBy)
        {
            Paged<Surveys> pagedList = null;
            List<Surveys> list = null;
            int totalCount = 0;

            string procName = "[dbo].[Surveys_Select_ByCreatedByV2]";

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@PageIndex", pageIndex);
                paramCollection.AddWithValue("@PageSize", pageSize);
                paramCollection.AddWithValue("@CreatedBy", createdBy);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;

                Surveys surveys = MapSurveys(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }
                if (list == null)
                {
                    list = new List<Surveys>();
                }
                list.Add(surveys);
            });
            if (list != null)
            {
                pagedList = new Paged<Surveys>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<Surveys> Search(int pageIndex, int pageSize, string query)
        {
            Paged<Surveys> pagedList = null;
            List<Surveys> list = null;
            int totalCount = 0;

            string procName = "dbo.Surveys_Select_ByQuery";

            _data.ExecuteCmd(procName, (inputParamMapper) =>
            {
                inputParamMapper.AddWithValue("@PageIndex", pageIndex);
                inputParamMapper.AddWithValue("@PageSize", pageSize);
                inputParamMapper.AddWithValue("@Query", query);
            },
                (reader, recordSetIndex) =>
                {
                    int startidx = 0;

                    Surveys surveys = MapSurveys(reader, ref startidx);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startidx++);
                    }

                    if (list == null)
                    {
                        list = new List<Surveys>();
                    }
                    list.Add(surveys);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<Surveys>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<Surveys> Pagination(int pageIndex, int pageSize)
        {
            Paged<Surveys> pagedList = null;
            List<Surveys> list = null;
            int totalCount = 0;

            string procName = "[dbo].[Surveys_SelectAllV2]";

            _data.ExecuteCmd(procName, (SqlParameterCollection inputParams) =>
            {
                inputParams.AddWithValue("@PageIndex", pageIndex);
                inputParams.AddWithValue("@PageSize", pageSize);
            },
            (IDataReader reader, short set) =>
            {
                int startingIndex = 0;

                Surveys surveys = MapSurveys(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex++);
                }
                if (list == null)
                {
                    list = new List<Surveys>();
                }
                list.Add(surveys);
            });
            if(list != null)
            {
                pagedList = new Paged<Surveys>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        private Surveys MapSurveys(IDataReader reader, ref int startingIndex)
        {
            Surveys aSurvey = new Surveys();            

            aSurvey.Id = reader.GetSafeInt32(startingIndex++);
            aSurvey.Name = reader.GetSafeString(startingIndex++);
            aSurvey.Description = reader.GetSafeString(startingIndex++);
            aSurvey.ImageUrl = reader.GetSafeString(startingIndex++);
            aSurvey.Status = _lookMapper.MapLookup(reader, ref startingIndex);
            aSurvey.SurveyType = _lookMapper.MapLookup(reader, ref startingIndex);
            aSurvey.CreatedBy = _userMapper.Map(reader, ref startingIndex);
            aSurvey.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aSurvey.DateModified = reader.GetSafeDateTime(startingIndex++);

            return aSurvey;
        }

        private static void AddCommonParams(SurveyAddRequest model, SqlParameterCollection col, int userId)
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@ImageUrl", model.ImageUrl);
            col.AddWithValue("@StatusId", model.StatusId);
            col.AddWithValue("@SurveyTypeId", model.SurveyTypeId);
            col.AddWithValue("@CreatedBy", userId);
        }
    }
}
