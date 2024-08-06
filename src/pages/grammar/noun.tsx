import React, { useState, ReactNode } from "react";
import {
  TranslateText,
  HighlightText,
  GrammarBookContainer,
  CText,
  SimpleTranslationExample,
  ExampleListContainer,
} from "~/styled-components/";

function SectionCase() {
  return (
    <section className="mb-8">
      <h2 className="mb-2 text-2xl font-semibold">Case</h2>
      <p className="mb-4">
        Kabardian has 4 cases: absolutive (traditionally also called nominative){" "}
        <CText d="e">-р</CText>, ergative <CText d="e">-м</CText>, instrumental{" "}
        <CText d="e">-кIэ</CText>, and adverbial <CText d="e">-уэ</CText>. The case markers are not
        part of the stem and are only suffixed when the noun is used in a sentence.
      </p>
      <p className="mb-4">
        Those 4 cases are divided into primary and secondary cases. The primary cases are only used
        if the noun is definite, while they are absent if the noun is indefinite (basically{" "}
        <span className="italic">the man</span> vs <span className="italic">a man</span>). The
        secondary cases are morphologically built upon the primary cases. This can be seen in
        definite nouns, where the instrumental case suffix <CText d="e">-кIэ</CText> is added to the
        ergative suffix <CText d="e">-м</CText>, resulting in
        <CText d="e">-мкIэ</CText>, and the adverbial case suffix
        <CText d="e">-уэ</CText> is added to the nominative suffix <CText d="e">-р</CText>,
        resulting in , resulting in <CText d="e">-рауэ</CText>.
      </p>

      <div className="overflow-x-auto">
        <table className="mb-4 w-full min-w-[600px] border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Case</th>
              <th className="border px-4 py-2">Absolutive</th>
              <th className="border px-4 py-2">Ergative</th>
              <th className="border px-4 py-2">Instrumental</th>
              <th className="border px-4 py-2">Adverbial</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Indefinite</td>
              <td className="border px-4 py-2">-∅</td>
              <td className="border px-4 py-2">-∅</td>
              <td>
                <CText d="e">-кIэ</CText>
              </td>
              <td>
                <CText d="e">-уэ</CText>
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Definite</td>
              <td>
                <CText d="e">-р</CText>
              </td>
              <td>
                <CText d="e">-м</CText>
              </td>
              <td>
                <CText d="e">-мкIэ</CText>
              </td>
              <td>
                <CText d="e">-рауэ</CText>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mb-4">Below are a few examples:</p>
      <ul className="mb-4 list-inside list-disc">
        <li>
          <CText d="e">пхъащIэм пхъэбгъухэр куэбжэу ищIащ</CText> :{" "}
          <TranslateText>the carpenter made a gate out of planks</TranslateText> (lit.{" "}
          <TranslateText>
            <span className="italic">the carpenter made planks like a gate</span>
          </TranslateText>
          )
        </li>
      </ul>

      <p className="mb-4">
        There is also a special interaction with the plural forms of a noun, as in their indefinite
        form they only have the adverbial form, while in their definite form they have all 4 cases.
        This is in line with the fact that marking the plural is optional and thus also inherently
        definite.
      </p>
      <div className="overflow-x-auto">
        <table className="mb-4 w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Case</th>
              <th className="border px-4 py-2">Absolutive</th>
              <th className="border px-4 py-2">Ergative</th>
              <th className="border px-4 py-2">Instrumental</th>
              <th className="border px-4 py-2">Adverbial</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Indefinite</td>
              <td className="border px-4 py-2">not used</td>
              <td className="border px-4 py-2">not used</td>
              <td className="border px-4 py-2">not used</td>
              <td>
                <CText d="e">-хэу</CText>
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Definite</td>
              <td>
                <CText d="e">-хэр</CText>
              </td>
              <td>
                <CText d="e">-хэм</CText>
              </td>
              <td>
                <CText d="e">-хэмкIэ</CText>
              </td>
              <td>
                <CText d="e">-хэрауэ</CText>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mb-4">
        However, the plural indefinite form is used in a vocative sense, which is used to address
        someone. This is also the only case where the plural indefinite form is used, e.g.
      </p>

      <ExampleListContainer>
        <SimpleTranslationExample d="e">
          <>щIалэхэ, къызэдэIуэ</>
          <>boys, listen to me</>
        </SimpleTranslationExample>
        <SimpleTranslationExample d="e">
          <>щIалэхэ, унэмкIэ фынеблагъэт</>
          <>boys, visit the house</>
        </SimpleTranslationExample>
      </ExampleListContainer>

      <p className="mb-4">
        Similar to the plural, other word forms also may require case marking to be grammatical.
        However note, that it is more accurate to say that not the noun, but the noun phrase is
        marked for the case.
      </p>

      <ExampleListContainer>
        <SimpleTranslationExample d="e">
          <>сосрыкъуэ нартхэм мафIэ къазэрыхуихьар</>
          <>how Sosruko brought fire to the Narts</>
        </SimpleTranslationExample>
        <SimpleTranslationExample d="e">
          <>хъуэжэ псым къызэрикIыжар</>
          <>how Khaja returned from the river</>
        </SimpleTranslationExample>
      </ExampleListContainer>
    </section>
  );
}

function SectionAbsolutive() {
  return (
    <section className="mb-8">
      <h2 className="mb-2 text-2xl font-semibold">Absolutive</h2>
      <p className="mb-4">
        The absolutive case is marked by the suffix <CText d="e">-р</CText>. As is usual for most
        ergative languages, the absolutive is used as the subject of an intransitive verb and as the
        direct object of a transitive verb.
      </p>

      <p className="mb-4">It denotes the subject of an intransitive verb.</p>
      <ExampleListContainer>
        <SimpleTranslationExample d="e">
          <>
            <HighlightText>хъыджэбзыр</HighlightText> мэбауэ
          </>
          <>
            <HighlightText>the girl</HighlightText> breaths
          </>
        </SimpleTranslationExample>
        <SimpleTranslationExample d="e">
          <>
            <HighlightText>фызыр</HighlightText> мэзым йоплъ
          </>
          <>
            <HighlightText>the woman</HighlightText> looks at the moon
          </>
        </SimpleTranslationExample>
      </ExampleListContainer>

      <p className="mb-4">It denotes the direct object of a transitive verb.</p>
      <ExampleListContainer>
        <SimpleTranslationExample d="e">
          <>
            сэ къэслъыхъуа <HighlightText>лIыр</HighlightText> къэзгъуэтащ
          </>
          <>
            I have found <HighlightText>the man</HighlightText> whom I was looking for
          </>
        </SimpleTranslationExample>
      </ExampleListContainer>

      <p className="mb-4">It denotes the nominal predicate in equative sentences.</p>
      <ExampleListContainer>
        <SimpleTranslationExample d="e">
          <>
            сэ тыкуэным згъэкIуар <HighlightText>си къуэшырщ</HighlightText>
          </>
          <>
            whom I have sent to the store <HighlightText>is my brother</HighlightText>
          </>
        </SimpleTranslationExample>
        <SimpleTranslationExample d="e">
          <>
            сэ хъыджэбз дахэр <HighlightText>си нысэрщ</HighlightText>
          </>
          <>
            this pretty girl <HighlightText>is my bride</HighlightText>
          </>
        </SimpleTranslationExample>
        <SimpleTranslationExample d="e">
          <>
            си къуэр <HighlightText>щакIуэрщ</HighlightText>
          </>
          <>
            my brother <HighlightText>is the hunter</HighlightText>
          </>
        </SimpleTranslationExample>
      </ExampleListContainer>
    </section>
  );
}
function SectionErgative() {
  return (
    <section className="mb-8">
      <h2 className="mb-2 text-2xl font-semibold">Ergative</h2>
      <p className="mb-4">If used with transitive verbs it denotes the subject.</p>
      <ExampleListContainer>
        <SimpleTranslationExample d="e">
          <>
            <HighlightText>лIым</HighlightText> дыгъужь илъэгъуащ
          </>
          <>
            <HighlightText>the man</HighlightText> saw a wolf
          </>
        </SimpleTranslationExample>
      </ExampleListContainer>
      <p className="mb-4">
        It also denotes the indirect object of intransitive and transitive verbs (mainly because the
        indirect object is governed by the preverb).
      </p>

      <ExampleListContainer>
        <SimpleTranslationExample d="e">
          <>
            хьэр <HighlightText>щIалэм</HighlightText> еплъащ
          </>
          <>
            the dog looked at <HighlightText> the boy</HighlightText>
          </>
        </SimpleTranslationExample>
        <SimpleTranslationExample d="e">
          <>
            щIалэм мыIэрысэ <HighlightText>тхьэмадэм</HighlightText> иритащ
          </>
          <>
            {" "}
            the boy gave <HighlightText>the Tkhamada</HighlightText> an apple
          </>
        </SimpleTranslationExample>
        <SimpleTranslationExample d="e">
          <>
            пщIащэр <HighlightText>щIалэм</HighlightText> еуащ
          </>
          <>
            {" "}
            the girl hit <HighlightText>the boy</HighlightText>
          </>
        </SimpleTranslationExample>
        <SimpleTranslationExample d="e">
          <>
            <HighlightText>щIалэм</HighlightText> мыIэрысэ иIащ
          </>
          <>
            {" "}
            the boy has <HighlightText>the apple</HighlightText>
          </>
        </SimpleTranslationExample>
      </ExampleListContainer>
      <p className="mb-4">It can also be used to create locative adverbs.</p>
      <ExampleListContainer>
        <SimpleTranslationExample d="e">
          <>
            уэ <HighlightText>къалэм</HighlightText> письмо птха?
          </>
          <>
            did you write the letter <HighlightText>to the city</HighlightText>?
          </>
        </SimpleTranslationExample>
        <SimpleTranslationExample d="e">
          <>
            <HighlightText>къуажэм</HighlightText> усшэнщ
          </>
          <>
            I&apos;ll lead you <HighlightText>to the village</HighlightText>
          </>
        </SimpleTranslationExample>
      </ExampleListContainer>
      <p className="mb-4">It can also be used to create temporal adverbs.</p>

      <ExampleListContainer>
        <SimpleTranslationExample d="e">
          <>
            <HighlightText>жэщым</HighlightText> хъэр мэбанэ
          </>
          <>
            the dog barks <HighlightText>at night</HighlightText>
          </>
        </SimpleTranslationExample>
      </ExampleListContainer>

      <p className="mb-4">It is also used in possessive constructions to denote the possessor.</p>

      <ExampleListContainer>
        <SimpleTranslationExample d="e">
          <>
            <HighlightText>фызым</HighlightText> и нэр
          </>
          <>
            <HighlightText>the woman</HighlightText>&apos;s eyes
          </>
        </SimpleTranslationExample>
      </ExampleListContainer>
    </section>
  );
}

function SectionInstrumental() {
  return (
    <section className="mb-8">
      <h2 className="mb-2 text-2xl font-semibold">Instrumental</h2>
      <p className="mb-4">It can denote an instrumental meaning.</p>
      <ExampleListContainer>
        <SimpleTranslationExample d="e">
          <>
            сабийр <HighlightText>къалэмкIэ</HighlightText> матхэ
          </>
          <>
            the child writes <HighlightText>with the pen</HighlightText>
          </>
        </SimpleTranslationExample>
        <SimpleTranslationExample d="e">
          <>
            дэ тенджызым <HighlightText>кхъухьлъатэкIэ</HighlightText> дылъэтащ
          </>
          <>
            we flew to the sea <HighlightText>with a plane</HighlightText>
          </>
        </SimpleTranslationExample>
      </ExampleListContainer>

      <p className="mb-4">It can denote the direction.</p>

      <ExampleListContainer>
        <SimpleTranslationExample d="e">
          <>
            бгым тет <HighlightText>унэмкIэ</HighlightText> маплъэ
          </>
          <>
            he looks <HighlightText> towards the house</HighlightText> standing on a hill
          </>
        </SimpleTranslationExample>
      </ExampleListContainer>
    </section>
  );
}
export default function NounPage() {
  return (
    <GrammarBookContainer>
      <h1 className="mb-4 text-3xl font-bold">Nouns</h1>
      <SectionCase />
      <SectionAbsolutive />
      <SectionErgative />
      <SectionInstrumental />
    </GrammarBookContainer>
  );
}
