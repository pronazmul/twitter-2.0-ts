import type { NextApiRequest, NextApiResponse } from 'next'
import { CommentBody } from '../../typings'

type Data = {
  message: String
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data: CommentBody = JSON.parse(req.body)
  const mutations = {
    mutations: [
      {
        create: {
          _type: 'comment',
          comment: data.comment,
          username: data.username,
          profileImg: data.profileImg,
          tweet: data.tweetId,
        },
      },
    ],
  }
  const result = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
      },
      body: JSON.stringify(mutations),
    }
  )
  const josn = await result.json()
  res.status(200).json({ message: 'Comment Added!' })
}
