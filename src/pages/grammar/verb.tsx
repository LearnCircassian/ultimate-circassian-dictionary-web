import React from "react";
import { GrammarBookContainer } from "~/styled-components";

function SectionErgativity() {
  return (
    <section>
      <h2 className="mb-2 text-2xl font-semibold">Ergativity</h2>
      <p>
        The most important thing before one starts to understands the verb is to understand that
        Kabardian is an ergative language, this is different from accusative languages. Most
        languages you probably know are accusative languages, for example English, Russian, Turkish,
        Arabic, German etc. In fact, around and in Europe only Basque and Caucasian languages, like
        Circassian, Georgian, etc, are ergative. In essence, ergative languages differ from
        accusative languages by how the subject of the sentence is marked depending on the
        verb&apos;s transitivity. While transitivity is expressed differently in different
        languages, the rough gist is that prototypical intransitive verbs have only a subject, while
        base transitive verbs have a subject and a direct object. In an accusative language, while
        exceptions exist, the main cases are nominative case and accusative case. The main cases in
        ergative languages are absolutive and ergative. In case of Circassian, unfortunately the
        established tradition is to call the absolutive case the nominative case. This might create
        confusion, thus I will not use that here, however know that usually when you hear nominative
        case in other sources, the absolutive case is meant.
      </p>
    </section>
  );
}

export default function VerbPage() {
  return (
    <GrammarBookContainer>
      <h1 className="mb-4 text-3xl font-bold">Verbs</h1>
      <SectionErgativity />.
    </GrammarBookContainer>
  );
}
