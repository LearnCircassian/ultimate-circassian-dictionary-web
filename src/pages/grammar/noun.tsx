import React from "react";
import H1 from "~/styled-components/h1";
import CText from "~/styled-components/CText";

export default function NounPage() {
  return (
    <div className="mx-auto mt-2 w-11/12">
      <h1 className="mb-4 text-3xl font-bold">Nouns</h1>

      <section className="mb-8">
        <h2 className="mb-2 text-2xl font-semibold">Case</h2>
        <p className="mb-4">
          Kabardian has 4 cases: absolutive (traditionally also called nominative){" "}
          <CText ipa="-r">-р</CText>, ergative <CText ipa="-m">-м</CText>, instrumental{" "}
          <CText ipa="-tʃʼa">-кIэ</CText>, and adverbial <CText ipa="-wa">-уэ</CText>. The case
          markers are not part of the stem and are only suffixed when the noun is used in a
          sentence.
        </p>
        <p className="mb-4">
          Those 4 cases are divided into primary and secondary cases. The primary cases are only
          used if the noun is definite, while they are absent if the noun is indefinite (basically{" "}
          <span className="italic">the man</span> vs <span className="italic">a man</span>). The
          secondary cases are morphologically built upon the primary cases. This can be seen in
          definite nouns, where the instrumental case suffix <CText ipa="-tʃʼa">-кIэ</CText> is
          added to the ergative suffix <CText ipa="-m">-м</CText>, resulting in
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
            : the carpenter made a gate out of planks (lit.{" "}
            <span className="italic">the carpenter made planks like a gate</span>)
          </li>
        </ul>

        <p className="mb-4">
          There is also a special interaction with the plural forms of a noun, as in their
          indefinite form they only have the adverbial form, while in their definite form they have
          all 4 cases. This is in line with the fact that marking the plural is optional and thus
          also inherently definite.
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

        <ul className="mb-4 list-inside list-disc">
          <li>
            <CText ipa="ɕʼaːɮaxa qəzadaʔʷa">щIалэхэ, къызэдэIуэ</CText>: boys, listen to me
          </li>
          <li>
            <CText ipa="ɕʼaːɮaxa wənamtʃʼa fənajbɮaʁat">щIалэхэ, унэмкIэ фынеблагъэт</CText>: boys,
            visit the house
          </li>
        </ul>

        <p className="mb-4">
          Similar to the plural, other word forms also may require case marking to be grammatical.
          However note, that it is more accurate to say that not the noun, but the noun phrase is
          marked for the case.
        </p>

        <ul className="mb-4 list-inside list-disc">
          <li>
            <CText ipa="sawsrəqʷa naːrtxam maːfʼa qaːzarəxʷəjħaːr">
              сосрыкъуэ нартхэм мафIэ къазэрыхуихьар
            </CText>
            : how Sosruko brought fire to the Narts
          </li>
          <li>
            <CText ipa="χʷaːʒa psəm qəzərəjtʃʼəʒaːr">хъуэжэ псым къызэрикIыжар</CText>: how Khaja
            returned from the river
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-2xl font-semibold">Absolutive</h2>
        <p className="mb-4">
          The absolutive case is marked by the suffix <CText ipa="-r">-р</CText>. As is usual for
          most ergative languages, the absolutive is used as the subject of an intransitive verb and
          as the direct object of a transitive verb.
        </p>

        <p className="mb-4">It denotes the subject of an intransitive verb.</p>
        <ul className="mb-4 list-inside list-disc">
          <li>
            <CText ipa="χədʒabzər mabaːwa">хъыджэбзыр мэбауэ</CText>:{" "}
            <span className="italic">the girl</span> breaths
          </li>
          <li>
            <CText ipa="fəzər mazəm jawpɬ">фызыр мэзым йоплъ</CText>: :{" "}
            <span className="italic">the woman</span> looks at the moon
          </li>
        </ul>

        <p className="mb-4">It denotes the direct object of a transitive verb.</p>
        <ul className="mb-4 list-inside list-disc">
          <li>
            <CText ipa="sa qasɬəχʷaː ɬʼər qazʁʷataːɕ">сэ къэслъыхъуа лIыр къэзгъуэтащ</CText>: I
            have found <span className="italic">the man</span> whom I was looking for
          </li>
        </ul>

        <p className="mb-4">It denotes the nominal predicate in equative sentences.</p>
        <ul className="mb-4 list-inside list-disc">
          <li>
            <CText ipa="sa təkʷanəm zʁakʷʼaːr səj qʷaʃərɕ">сэ тыкуэным згъэкIуар си къуэшырщ</CText>
            : whom I have sent to the store <span className="italic">is my brother</span>
          </li>
          <li>
            <CText ipa="sa χədʒabz daːxar səj nəsarɕ">сэ хъыджэбз дахэр си нысэрщ</CText>: this
            pretty girl is my bride
          </li>
          <li>
            <CText ipa="səj qʷar ɕaːkʷʼarɕ">си къуэр щакIуэрщ</CText>: my brother{" "}
            <span className="italic">is the hunter</span>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-2xl font-semibold">Ergative</h2>
        <p className="mb-4">If used with transitive verbs it denotes the subject.</p>
        <ul className="mb-4 list-inside list-disc">
          <li>
            <CText ipa="ɬʼəm dəʁʷəʑ jəɬaʁʷaːɕ">лIым дыгъужь илъэгъуащ</CText>:{" "}
            <span className="italic">the man</span> saw a wolf
          </li>
        </ul>
        <p className="mb-4">
          It also denotes the indirect object of intransitive and transitive verbs (mainly because
          the indirect object is governed by the preverb).
        </p>
        <ul className="mb-4 list-inside list-disc">
          <li>
            <CText ipa="ħar ɕʼaːɮam japɬaːɕ">хьэр щIалэм еплъащ</CText>: the dog looked at{" "}
            <span className="italic">the boy</span>
          </li>
        </ul>
        <ul className="mb-4 list-inside list-disc">
          <li>
            <CText ipa="ɕʼaːɮam məʔarəsa tħamaːdam jərətaːɕ">
              щIалэм мыIэрысэ тхьэмадэм иритащ
            </CText>
            : the boy gave <span className="italic">the Tkhamada</span> an applied
          </li>
        </ul>
        <p className="mb-4">It can also be used to create locative adverbs.</p>
        <ul className="mb-4 list-inside list-disc">
          <li>
            <CText ipa="wa qaːɮam pəjsmaw ptxaː">уэ къалэм письмо птха?</CText>: did you write the
            letter <span className="italic">to the city</span>?
          </li>
          <li>
            <CText ipa="qʷaːʒam wəsʃanɕ">къуажэм усшэнщ</CText>: I&apos;ll lead you{" "}
            <span className="italic">to the village</span>
          </li>
        </ul>
        <p className="mb-4">It can also be used to create temporal adverbs.</p>
        <ul className="mb-4 list-inside list-disc">
          <li>
            <CText ipa="ʒaɕəm ħar mabaːna">жэщым хъэр мэбанэ</CText>: the dog barks
            <span className="italic">at night</span>
          </li>
        </ul>
        8
        <p className="mb-4">It is also used in possessive constructions to denote the possessor.</p>
        <ul className="mb-4 list-inside list-disc">
          <li>
            <CText ipa="fəzən jə nar">фызым и нэр</CText>: the woman&apos;s eyes
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-2xl font-semibold">Instrumental</h2>
        <p className="mb-4">It can denote an instrumental meaning.</p>
        <ul className="mb-4 list-inside list-disc">
          <li>
            <CText ipa="saːbəjr qaːɮamtʃʼa maːtxa">сабийр къалэмкIэ матхэ</CText>: the child writes{" "}
            <span className="italic">with the pen</span>
          </li>
          <li>
            <CText
              ipa="da tajndʒəzəm
            qχʷəħɬaːtatʃʼa dəɬataːɕ"
            >
              дэ тенджызым кхъухьлъатэкIэ дылъэтащ
            </CText>
            : we flew to the sea <span className="italic">with a plane</span>
          </li>
        </ul>

        <p className="mb-4">It can denote the direction.</p>
        <ul className="mb-4 list-inside list-disc">
          <li>
            <CText ipa="bɣəm tajt wənamtʃʼa maːpɬa">бгым тет унэмкIэ маплъэ</CText>: he looks
            <span className="italic"> towards the house</span> standing on a hill
          </li>
        </ul>
      </section>
    </div>
  );
}
