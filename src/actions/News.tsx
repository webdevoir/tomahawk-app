
import { ActionTypes } from '../config/Constants'
import { fetchNews } from '../services'

const { GET_NEWS_SUCCESS, GET_NEWS_REQUEST, GET_NEWS_ERROR } = ActionTypes

const getNewsError = () => (
  {
    payload: { error: true },
    type: GET_NEWS_ERROR
  }
)

const getNewsSuccess = (news: any) => (
    {
      payload: { news },
      type: GET_NEWS_SUCCESS
    }
)

const getNewsRequest = () => (
    {
      payload: { loading: true },
      type: GET_NEWS_REQUEST
    }
)
export const getNews = () => (
    (dispatch: any) => {
      dispatch(getNewsRequest())
      return fetchNews()
        .then((news: any) => dispatch(getNewsSuccess(news)))
        .catch(() => dispatch(getNewsError()))
    }
)