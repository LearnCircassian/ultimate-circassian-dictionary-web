import React from "react";
import { CText, GrammarBookContainer, TranslateText } from "~/styled-components";

function Col({ children, color }: { children: React.ReactNode; color: "red" | "blue" | "green" }) {
  let style = "";
  switch (color) {
    case "red":
      style = "text-red-500";
      break;
    case "blue":
      style = "text-blue-500";
      break;
    case "green":
      style = "text-green-500";
      break;
  }
  return <span className={style}>{children}</span>;
}
function ColR({ children }: { children: React.ReactNode }) {
  return <Col color="red">{children}</Col>;
}
function ColB({ children }: { children: React.ReactNode }) {
  return <Col color="blue">{children}</Col>;
}
function ColG({ children }: { children: React.ReactNode }) {
  return <Col color="green">{children}</Col>;
}

function SectionErgativity() {
  return (
    <section>
      <h2 className="mb-2 text-2xl font-semibold">Ergativity</h2>
      <p className="mb-4">
        Understanding the verb structure in Kabardian requires recognizing that it is an ergative
        language, which is different from the more familiar accusative languages such as English,
        Russian, Turkish, Arabic, and German. In Europe and nearby regions, only a few languages
        like Basque and other Caucasian languages, including Circassian and Georgian, follow the
        ergative system.
      </p>
      <p className="mb-4">
        In linguistic terms, the key difference between ergative and accusative languages lies in
        how the subject of a sentence is marked, depending on whether the verb is transitive
        (involving a direct object) or intransitive (no direct object). Generally, intransitive
        verbs have just a subject, while transitive verbs include both a subject and a direct
        object.
      </p>
      <p className="mb-4">
        Accusative languages typically use <ColR>nominative</ColR> and <ColB>accusative</ColB> cases
        to mark these roles. However, in ergative languages like Kabardian, the primary cases are{" "}
        <ColR>absolutive</ColR> and <ColB>ergative</ColB>. It&apos;s worth noting that in some
        Circassian linguistic traditions, the absolutive case is referred to as the nominative case.
        This can be confusing, so for clarity, the term &apos;absolutive&apos; will be used here to
        avoid misunderstandings, though other sources might use &apos;nominative&apos; to mean the
        same thing.
      </p>
      <p className="mb-4">
        In accusative languages, it does not matter what the transitivity of the verb is, the
        subject is usually expressed by the nominative case. In the following English will be used
        to demonstrate that. English is not a good example of showing those differences, as it has
        lost the marking which would differentiate between nominative and accusative cases, except
        in a few places like the pronouns. But it will be enough to show the difference between
        accusative and ergative languages.
      </p>
      <p className="mb-4">
        Let&apos;s take the following Engish verbs <CText>to look</CText>, an intransitive verb, and{" "}
        <CText>to see Y</CText>, a transitive verb. In English the subject of both verbs is marked
        marked by the nominative case. However the verb{" "}
        <CText>
          to see <ColB>Y</ColB>
        </CText>{" "}
        requires a direct object (<ColB>Y</ColB>), while the verb <CText>to look</CText> is not able
        to take a direct object. This amounts to that one can say{" "}
        <CText>
          <ColR>You</ColR> see <ColB>me</ColB>
        </CText>
        , but one canot say{" "}
        <CText>
          *<ColR>You</ColR> look <ColB>me</ColB>
        </CText>
        . The asterisk (*) indicates that the sentence is ungrammatical. To make the sentence
        grammatical one has to use the preposition, like{" "}
        <CText>
          <ColG>at</ColG>
        </CText>
        , as in{" "}
        <CText>
          <ColR>You</ColR> look <ColG>at me</ColG>
        </CText>
        . But then the object{" "}
        <CText>
          <ColG>me</ColG>
        </CText>{" "}
        is not a direct object, but an indirect one, as it is the object of the preposition and not
        the verb itself.
      </p>
      <p className="mb-4">
        In Circassian the same principles apply. The difference that intransitive verbs mark the
        subject with the absolutive, while transitive verbs makr the subject with the ergative case,
        while the object is marked with the absolutive case. The following examples will show the
        difference between the two cases.
      </p>
      <p className="mb-4">
        Let&apos;s take the following Circassian verbs <CText ipa="pɬan">плъэн</CText>{" "}
        <TranslateText>to look</TranslateText> and <CText ipa="ɬaːʁʷən">лъагъун</CText>{" "}
        <TranslateText>
          to see <ColR>Y</ColR>{" "}
        </TranslateText>
        . Except that the cases are different, they are exactly the same to their English counter
        parts in regards to the direct object. One can say{" "}
        <CText ipa="wa sa səpɬaːʁʷənɕ">
          <ColB>уэ</ColB> <ColR>сэ</ColR> <ColR>сы</ColR>
          <ColB>п</ColB>лъагъунщ
        </CText>{" "}
        <TranslateText>
          <ColB>You</ColB>&apos;ll see <ColR>me</ColR>
        </TranslateText>
        , as with the English equivalent one can only say{" "}
        <CText ipa="wa wəpɬanɕ">
          <ColR>уэ</ColR> <ColR>у</ColR>плэнщ
        </CText>{" "}
        <TranslateText>
          <ColR>You</ColR>&apos;ll look
        </TranslateText>
        . To add an object to <CText ipa="pɬan">плъэн</CText>, one has to to use a preverb
        (Circassiasn equivalent of preposition), like{" "}
        <CText ipa="taj-">
          <ColG>те-</ColG>
        </CText>
        , which results into the verb{" "}
        <CText ipa="tajpɬan">
          <ColG>те</ColG>плъэн
        </CText>
        . This allows to say{" "}
        <CText ipa="wa sa qəstajpɬanɕ">
          <ColR>уэ</ColR> <ColG>сэ</ColG> <ColR>у</ColR>къы<ColG>сте</ColG>плъэнщ
        </CText>{" "}
        <TranslateText>
          <ColR>You</ColR>&apos;ll look <ColG>down on me</ColG>
        </TranslateText>
        .
      </p>
      <p className="mb-4">
        One way to think about that is to think of ergative verbs as passivized verbs, only that in
        ergative languages the perceived meaning is not really passivized. For example, if we take
        the phrase{" "}
        <CText ipa="wa sa səpɬaːʁʷənɕ">
          <ColB>уэ</ColB> <ColR>сэ</ColR> <ColR>сы</ColR>
          <ColB>п</ColB>лъагъунщ
        </CText>{" "}
        <TranslateText>
          <ColB>You</ColB>&apos;ll see <ColR>me</ColR>
        </TranslateText>{" "}
        and simply transform it the translation in our head to{" "}
        <TranslateText>
          <ColR>I</ColR>&apos;ll be seen <ColB>by you</ColB>
        </TranslateText>
        . In that analogy{" "}
        <TranslateText>
          <ColR>I</ColR>
        </TranslateText>{" "}
        is the absolutive case, while{" "}
        <TranslateText>
          <ColB>by you</ColB>
        </TranslateText>{" "}
        in the ergative case.
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
