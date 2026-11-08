import axios from 'axios'

export type Part = 'WEB' | 'iOS' | 'ANDROID'

interface IssueCodeResponse {
  authorizationCode?: string
  data?: {
    authorizationCode?: string
  }
}

export async function issueCode(part: Part) {
  const apiUrl = import.meta.env.VITE_API_URL

  if (!apiUrl) {
    throw new Error('인증 API 주소가 설정되지 않았습니다.')
  }

  const { data } = await axios.post<IssueCodeResponse>(
    `${apiUrl}/members/authorization-code`,
    { part },
  )

  const authorizationCode = data.authorizationCode ?? data.data?.authorizationCode

  if (!authorizationCode) {
    throw new Error('응답에서 인증 코드를 찾을 수 없습니다.')
  }

  return authorizationCode
}
