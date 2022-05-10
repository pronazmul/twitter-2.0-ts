import type { NextApiRequest, NextApiResponse } from 'next'
import { sanityClient } from '../../sanity'
import { groq } from 'next-sanity'
import { Comment } from '../../typings'

type Data = { comments: Comment[] }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { tweetId } = req.query
  const query = groq`*[_type=='comment' && references(*[_type=='tweet'&&_id==$tweetId]._id)]{ _id,
    ...
  }| order(_createdAt desc)`

  const comments: Comment[] = await sanityClient.fetch(query, {
    tweetId,
  })
  res.status(200).json({ comments })
}
