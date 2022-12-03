import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'
import { postFilePaths, POSTS_PATH } from '../utils/mdxUtils'
import Layout from '../components/layout';

export default function Home({ source, frontMatter, postsMeta }) {
  return (
    <Layout home> 
      <main>
        <MDXRemote {...source} />
        <div>
          {
            postsMeta.map(meta => 
              <div>
                <div>{meta.title}</div>
                <div>{meta.description}</div>
              </div>
              )
          }
        </div>
      </main>
    </Layout>
  )
}

const getPostMeta = async () => {
  const allPostMeta = []
  for (const postFile of postFilePaths) {
    const postFilePath = path.join(POSTS_PATH, postFile)
    console.log(postFilePath)

    if (postFilePath === path.join(POSTS_PATH, `index.mdx`)) {
      continue;
    }
    const source = fs.readFileSync(postFilePath)
  
    const { content, data } = matter(source)
    allPostMeta.push(data)
  }
  console.log(allPostMeta)
  return allPostMeta;
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `index.mdx`)
  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  })

  const postsMetadata = await getPostMeta()
  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      postsMeta: postsMetadata,
    },
  }
}