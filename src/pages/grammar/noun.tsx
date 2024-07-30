import React from "react";
import GrammarBookContainer from "~/styled-components/GrammarBookContainer";
import CText, { TranslateText, HighlightText } from "~/styled-components/CText";

//TODO(artur): This component should have 3 togglable states: default, expanded and collapsed.
//             The idea is that one should be able to provide as much examples as possible
//             without cluttering the page. This way the user can decide how much information is visible.
//SNIPPET:
// <ExampleListContainer>
//   <SimpleTranslationExample>
//     <></>
//     <></>
//   </SimpleTranslationExample>
// </ExampleListContainer>;
function ExampleListContainer({ children }: { children: React.ReactNode[] | React.ReactNode }) {
  return (
    <ul className="mb-4 list-inside list-disc rounded border border-green-500 bg-green-100 p-4 shadow">
      {Array.isArray(children) ? (
        children.map((child, index) => <li key={index}>{child}</li>)
      ) : (
        <li>{children}</li>
      )}
    </ul>
  );
}

function SimpleTranslationExample({
  children,
  ipa,
}: {
  children: [React.ReactNode, React.ReactNode];
  ipa?: string;
}) {
  return (
    <>
      <CText ipa={ipa}>{children[0]}</CText> - <TranslateText>{children[1]}</TranslateText>
    </>
  );
}

function SectionCase() {
  return (
    <section className="mb-8">
      <h2 className="mb-2 text-2xl font-semibold">Case</h2>
      <p className="mb-4">
        Kabardian has 4 cases: absolutive (traditionally also called nominative){" "}
        <CText ipa="-r">-р</CText>, ergative <CText ipa="-m">-м</CText>, instrumental{" "}
        <CText ipa="-tʃʼa">-кIэ</CText>, and adverbial <CText ipa="-wa">-уэ</CText>. The case
        markers are not part of the stem and are only suffixed when the noun is used in a sentence.
      </p>
      <p className="mb-4">
        Those 4 cases are divided into primary and secondary cases. The primary cases are only used
        if the noun is definite, while they are absent if the noun is indefinite (basically{" "}
        <span className="italic">the man</span> vs <span className="italic">a man</span>). The
        secondary cases are morphologically built upon the primary cases. This can be seen in
        definite nouns, where the instrumental case suffix <CText ipa="-tʃʼa">-кIэ</CText> is added
        to the ergative suffix <CText ipa="-m">-м</CText>, resulting in
        <CText ipa="-mtʃʼa">-мкIэ</CText>, and the adverbial case suffix
        <CText ipa="-wa">-уэ</CText> is added to the nominative suffix <CText ipa="-r">-р</CText>,
        resulting in , resulting in <CText ipa="-raːwa">-рауэ</CText>.
      </p>

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
            <td className="border px-4 py-2">-∅</td>
            <td className="border px-4 py-2">-∅</td>
            <td>
              <CText ipa="-tʃʼa">-кIэ</CText>
            </td>
            <td>
              <CText ipa="-wa">-уэ</CText>
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Definite</td>
            <td>
              <CText ipa="-r">-р</CText>
            </td>
            <td>
              <CText ipa="-m">-м</CText>
            </td>
            <td>
              <CText ipa="-mtʃʼa">-мкIэ</CText>
            </td>
            <td>
              <CText ipa="-raːwa">-рауэ</CText>
            </td>
          </tr>
        </tbody>
      </table>

      <p className="mb-4">Below are a few examples:</p>
      <ul className="mb-4 list-inside list-disc">
        <li>
          <CText ipa="pχaːɕʼam pχabʁʷxar kʷabʒawə jəɕʼaːɕ">
            пхъащIэм пхъэбгъухэр куэбжэу ищIащ
          </CText>{" "}
          : <TranslateText>the carpenter made a gate out of planks</TranslateText> (lit.{" "}
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
              <CText ipa="-xawə">-хэу</CText>
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Definite</td>
            <td>
              <CText ipa="-xar">-хэр</CText>
            </td>
            <td>
              <CText ipa="-xam">-хэм</CText>
            </td>
            <td>
              <CText ipa="-xamtʃʼa">-хэмкIэ</CText>
            </td>
            <td>
              <CText ipa="-xaraːwa">-хэрауэ</CText>
            </td>
          </tr>
        </tbody>
      </table>

      <p className="mb-4">
        However, the plural indefinite form is used in a vocative sense, which is used to address
        someone. This is also the only case where the plural indefinite form is used, e.g.
      </p>

      <ExampleListContainer>
        <SimpleTranslationExample ipa="ɕʼaːɮaxa qəzadaʔʷa">
          <>щIалэхэ, къызэдэIуэ</>
          <>boys, listen to me</>
        </SimpleTranslationExample>
        <SimpleTranslationExample ipa="ɕʼaːɮaxa wənamtʃʼa fənajbɮaʁat">
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
        <SimpleTranslationExample ipa="sawsrəqʷa naːrtxam maːfʼa qaːzarəxʷəjħaːr">
          <>сосрыкъуэ нартхэм мафIэ къазэрыхуихьар</>
          <>how Sosruko brought fire to the Narts</>
        </SimpleTranslationExample>
        <SimpleTranslationExample ipa="χʷaːʒa psəm qəzərəjtʃʼəʒaːr">
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
        The absolutive case is marked by the suffix <CText ipa="-r">-р</CText>. As is usual for most
        ergative languages, the absolutive is used as the subject of an intransitive verb and as the
        direct object of a transitive verb.
      </p>

      <p className="mb-4">It denotes the subject of an intransitive verb.</p>
      <ExampleListContainer>
        <SimpleTranslationExample ipa="χədʒabzər mabaːwa">
          <>
            <HighlightText>хъыджэбзыр</HighlightText> мэбауэ
          </>
          <>
            <HighlightText>the girl</HighlightText> breaths
          </>
        </SimpleTranslationExample>
        <SimpleTranslationExample ipa="fəzər mazəm jawpɬ">
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
        <SimpleTranslationExample ipa="sa qasɬəχʷaː ɬʼər qazʁʷataːɕ">
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
        <SimpleTranslationExample ipa="sa təkʷanəm zʁakʷʼaːr səj qʷaʃərɕ">
          <>
            сэ тыкуэным згъэкIуар <HighlightText>си къуэшырщ</HighlightText>
          </>
          <>
            whom I have sent to the store <HighlightText>is my brother</HighlightText>
          </>
        </SimpleTranslationExample>
        <SimpleTranslationExample ipa="sa χədʒabz daːxar səj nəsarɕ">
          <>
            сэ хъыджэбз дахэр <HighlightText>си нысэрщ</HighlightText>
          </>
          <>
            this pretty girl <HighlightText>is my bride</HighlightText>
          </>
        </SimpleTranslationExample>
        <SimpleTranslationExample ipa="səj qʷar ɕaːkʷʼarɕ">
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
        <SimpleTranslationExample ipa="ɬʼəm dəʁʷəʑ jəɬaʁʷaːɕ">
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
        <SimpleTranslationExample ipa="ħar ɕʼaːɮam japɬaːɕ">
          <>
            хьэр <HighlightText>щIалэм</HighlightText> еплъащ
          </>
          <>
            the dog looked at <HighlightText> the boy</HighlightText>
          </>
        </SimpleTranslationExample>
        <SimpleTranslationExample ipa="ɕʼaːɮam məʔarəsa tħamaːdam jərətaːɕ">
          <>
            щIалэм мыIэрысэ <HighlightText>тхьэмадэм</HighlightText> иритащ
          </>
          <>
            {" "}
            the boy gave <HighlightText>the Tkhamada</HighlightText> an applied
          </>
        </SimpleTranslationExample>
      </ExampleListContainer>
      <p className="mb-4">It can also be used to create locative adverbs.</p>
      <ExampleListContainer>
        <SimpleTranslationExample ipa="wa qaːɮam pəjsmaw ptxaː">
          <>
            уэ <HighlightText>къалэм</HighlightText> письмо птха?
          </>
          <>
            did you write the letter <HighlightText>to the city</HighlightText>?
          </>
        </SimpleTranslationExample>
        <SimpleTranslationExample ipa="qʷaːʒam wəsʃanɕ">
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
        <SimpleTranslationExample ipa="ʒaɕəm ħar mabaːna">
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
        <SimpleTranslationExample ipa="fəzəm jə nar">
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
        <SimpleTranslationExample ipa="saːbəjr qaːɮamtʃʼa maːtxa">
          <>
            сабийр <HighlightText>къалэмкIэ</HighlightText> матхэ
          </>
          <>
            the child writes <HighlightText>with the pen</HighlightText>
          </>
        </SimpleTranslationExample>
        <SimpleTranslationExample ipa="da tajndʒəzəm qχʷəħɬaːtatʃʼa dəɬataːɕ">
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
        <SimpleTranslationExample ipa="bɣəm tajt wənamtʃʼa maːpɬa">
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
