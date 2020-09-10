import { Fragment } from "react"

import { GetStaticProps, GetStaticPaths } from "next"

const Landing = ({ lang = "en" }) => (
  <Fragment>
    <h1>Test Page</h1>
    <h4>Lang: {lang}</h4>
  </Fragment>
)

export const getStaticPaths: GetStaticPaths = async () => {
  const languages = ["en", "fr", "gb"]

  return {
    paths: languages.map((language) => ({
      params: { lang: language }
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: {
    ...params
  }
})

export default Landing
