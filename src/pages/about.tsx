import React from "react";
import { GrammarBookContainer } from "~/styled-components";

export default function AboutPage() {
  return (
    <GrammarBookContainer>
      <h1 className="text-3xl font-bold">About Us</h1>
      <h2 className="text-2xl font-bold">Team</h2>
      <p>We are a small team of two people who are passionate about the Circassian Language.</p>
      <h2 className="text-2xl font-bold">Our Mission</h2>
      <p>
        Our mission is to create resources for the Circassian language in the English language and
        make it more accessible to everyone. We have decided on English because of the large
        diaspora and English being the lingua franca of the world. We plan to achieve that through
        various means:
        <ul className="mb-4 list-inside list-disc">
          <li>
            <strong>Dictionary:</strong> A dictionary search engine that allows to easily and
            comfortably search through various Circassian dictionaries. There might be UI changes or
            additional features in the future, but it mostly works already.
          </li>
          <li>
            <strong>Grammar Guide:</strong> A grammar guide, which in essence is a collection of
            articles, which covers the grammar of the Circassian language in a structured way. A
            major focus will be on attempting to cover the grammar of both Standard Western
            Circassian and Standard Eastern Circassian at the same time, based on very major
            similarities between the two. While that is a major focus, there will be also articles
            which go into further detail about the grammar of a specific Standard dialect. And while
            covering the Standard dialects is the main focus, where appropriate, we will also cover
            how non-Standard dialects differ from the Standard dialects. This is still a major work
            in progress and we are only at the very beginnings of it.
          </li>
          <li>
            <strong>Blog:</strong> A blog, which in essence is a collection of articles, which
            covers various topics of the Circassian language in a less structured way, compared to
            the grammar guide. The idea behind it is to cover topics related to the Circassian
            language, which would not fit into the grammar guide, but are still valuable to know. To
            keep track of the various topics blog articles could cover, tags will be introduced. The
            kind of tags which could be are &ldquo;translation&rdquo;, &ldquo;word usage&rdquo;,
            etc. This is still a major work in progress and we are only at the very beginnings of
            it.
          </li>
        </ul>
        We are open for new ideas and suggestions to achieve the above mission. We focus on the
        above three means, because we have the most expertise there.
      </p>
      <h2 className="text-2xl font-bold">Contribution</h2>
      <p>
        We are open to contributions from anyone who is willing to work on We are always open to new
        contributors eager to enhance our resources. While we particularly value input from native
        speakers knowledgeable in grammar (bonus points if you can code!), we warmly welcome anyone
        with a strong grasp of the language. Contributions can vary from writing articles and
        developing the website to sharing our content, proofreading, or even sparking discussions
        about language improvements. Every bit of help is cherished.
      </p>
    </GrammarBookContainer>
  );
}
