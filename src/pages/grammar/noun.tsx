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
          Kabardian has 4 cases: absolutive (traditionally also called nominative) <CText>-р</CText>{" "}
          (<span className="italic">-r</span>), ergative <CText>-м</CText> (
          <span className="italic">-m</span>), instrumental <CText>-кIэ</CText> (
          <span className="italic">-tʃʼa</span>), and adverbial{" "}
          <span className="font-bold">-уэ</span> (<span className="italic">-wa</span>). The case
          markers are not part of the stem and are only suffixed when the noun is used in a
          sentence.
        </p>
        <p className="mb-4">
          Those 4 cases are divided into primary and secondary cases. The primary cases are only
          used if the noun is definite, while they are absent if the noun is indefinite (basically{" "}
          <span className="italic">the man</span> vs <span className="italic">a man</span>). The
          secondary cases are morphologically built upon the primary cases. This can be seen in
          definite nouns, where the instrumental case suffix <span className="font-bold">-кIэ</span>{" "}
          (<span className="italic">-tʃʼa</span>) is added to the ergative suffix{" "}
          <span className="font-bold">-м</span> (<span className="italic">-m</span>), resulting in{" "}
          <span className="font-bold">-мкIэ</span> (<span className="italic">-mtʃʼa</span>), and the
          adverbial case suffix <span className="font-bold">-уэ</span> (
          <span className="italic">-wa</span>) is added to the nominative suffix{" "}
          <span className="font-bold">-р</span> (<span className="italic">-r</span>), resulting in{" "}
          <span className="font-bold">-рауэ</span> (<span className="italic">-raːwa</span>).
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
              <td className="border px-4 py-2">-кIэ (-tʃʼa)</td>
              <td className="border px-4 py-2">-уэ (-wa)/-у (-wə)</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Definite</td>
              <td className="border px-4 py-2">-р (-r)</td>
              <td className="border px-4 py-2">-м (-m)</td>
              <td className="border px-4 py-2">-мкIэ (-mtʃʼa)</td>
              <td className="border px-4 py-2">-рауэ (-raːwa)</td>
            </tr>
          </tbody>
        </table>

        <p className="mb-4">Below are a few examples:</p>
        <ul className="mb-4 list-inside list-disc">
          <li>
            <span className="font-bold">пхъащIэм пхъэбгъухэр куэбжэу ищIащ</span> (pχaːɕʼam
            pχabʁʷxar kʷabʒawə jəɕʼaːɕ): the carpenter made a gate out of planks (lit.{" "}
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
              <td className="border px-4 py-2">-хэу (-xawə)</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Definite</td>
              <td className="border px-4 py-2">-хэр (-xar)</td>
              <td className="border px-4 py-2">-хэм (-xam)</td>
              <td className="border px-4 py-2">-хэмкIэ (-xamtʃʼa)</td>
              <td className="border px-4 py-2">-хэрауэ (-xaraːwa)</td>
            </tr>
          </tbody>
        </table>

        <p className="mb-4">
          However, the plural indefinite form is used in a vocative sense, which is used to address
          someone. This is also the only case where the plural indefinite form is used, e.g.
        </p>

        <ul className="mb-4 list-inside list-disc">
          <li>
            <span className="font-bold">щIалэхэ, къызэдэIуэ</span> (ɕʼaːɮaxa qəzadaʔʷa): boys,
            listen to me
          </li>
          <li>
            <span className="font-bold">щIалэхэ, унэмкIэ фынеблагъэт</span> (ɕʼaːɮaxa wənamtʃʼa
            fənajbɮaːʁat): boys, visit the house
          </li>
        </ul>

        <p className="mb-4">
          Similar to the plural, other word forms also may require case marking to be grammatical.
          However note, that it is more accurate to say that not the noun, but the noun phrase is
          marked for the case.
        </p>

        <ul className="mb-4 list-inside list-disc">
          <li>
            <span className="font-bold">сосрыкъуэ нартхэм мафIэ къазэрыхуихьар</span> (sawsrəqʷa
            naːrtxam maːfʼa qaːzarəxʷəjħaːr): how Sosruko brought fire to the Narts
          </li>
          <li>
            <span className="font-bold">хъуэжэ псым къызэрикIыжар</span> (χʷaːʒa psəm
            qəzərəjtʃʼəʒaːr): how Khaja returned from the river
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-2xl font-semibold">Absolutive</h2>
        <p className="mb-4">
          The absolutive case is marked by the suffix <span className="font-bold">-р</span> (
          <span className="italic">-r</span>). As is usual for most ergative languages, the
          absolutive is used as the subject of an intransitive verb and as the direct object of a
          transitive verb.
        </p>

        <p className="mb-4">It denotes the subject of an intransitive verb.</p>
        <ul className="mb-4 list-inside list-disc">
          <li>
            <span className="font-bold">хъыджэбзыр мэбауэ</span> (χədʒabzər mabaːwa):{" "}
            <span className="italic">the girl</span> breaths
          </li>
          <li>
            <span className="font-bold">фызыр мэзым йоплъ</span> (fəzər mazəm jawpɬ):{" "}
            <span className="italic">the woman</span> looks at the moon
          </li>
        </ul>

        <p className="mb-4">It denotes the direct object of a transitive verb.</p>
        <ul className="mb-4 list-inside list-disc">
          <li>
            <span className="font-bold">сэ къэслъыхъуа лIыр къэзгъуэтащ</span> (sa qasɬəχʷaː ɬʼər
            qazʁʷataːɕ): I have found <span className="italic">the man</span> whom I was looking for
          </li>
        </ul>

        <p className="mb-4">It denotes the nominal predicate in equative sentences.</p>
        <ul className="mb-4 list-inside list-disc">
          <li>
            <span className="font-bold">сэ тыкуэным згъэкIуар си къуэшырщ</span> (sa təkʷanəm
            zʁakʷʼaːr səj qʷaʃərɕ): whom I have sent to the store{" "}
            <span className="italic">is my brother</span>
          </li>
          <li>
            <span className="font-bold">а хъыджэбз дахэр си нысэрщ</span> (aː χədʒabz daːxar səj
            nəsarɕ): this pretty girl is my bride
          </li>
          <li>
            <span className="font-bold">си къуэр щакIуэрщ</span> (səj qʷar ɕaːkʷʼarɕ): my brother{" "}
            <span className="italic">is the hunter</span>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-2xl font-semibold">Ergative</h2>
        <p className="mb-4">If used with transitive verbs it denotes the subject.</p>
        <ul className="mb-4 list-inside list-disc">
          <li>
            <span className="font-bold">лIым дыгъужь илъэгъуащ</span> (ɬʼəm dəʁʷəʑ jəɬaʁʷaːɕ):{" "}
            <span className="italic">the man</span> saw a wolf
          </li>
        </ul>

        <p className="mb-4">
          It also denotes the indirect object of intransitive and transitive verbs (mainly because
          the indirect object is governed by the preverb).
        </p>
        <ul className="mb-4 list-inside list-disc">
          <li>
            <span className="font-bold">хьэр щIалэм еплъащ</span> (ħar ɕʼaːɮam japɬaːɕ): the dog
            looked at <span className="italic">the boy</span>
          </li>
        </ul>

        <ul className="mb-4 list-inside list-disc">
          <li>
            <span className="font-bold">щIалэм мыIэрысэ тхьэмадэм иритащ</span> (ɕʼaːɮam məʔarəsa
            tħamaːdam jərətaːɕ): the boy gave <span className="italic">the Tkhamada</span> an
            applied
          </li>
        </ul>

        <p className="mb-4">It can also be used to create locative adverbs.</p>
        <ul className="mb-4 list-inside list-disc">
          <li>
            <span className="font-bold">уэ къалэм письмо птха?</span> (wa qaːɮam pəjsmaw ptxaː): did
            you write the letter <span className="italic">to the city</span>?
          </li>
          <li>
            <span className="font-bold">къуажэм усшэнщ</span> (qʷaːʒam wəsʃanɕ): I&apos;ll lead you{" "}
            <span className="italic">to the village</span>
          </li>
        </ul>

        <p className="mb-4">It can also be used to create temporal adverbs.</p>
        <ul className="mb-4 list-inside list-disc">
          <li>
            <span className="font-bold">жэщым хъэр мэбанэ</span> (ʒaɕəm ħar mabaːna): the dog barks{" "}
            <span className="italic">at night</span>
          </li>
        </ul>

        <p className="mb-4">It is also used in possessive constructions to denote the possessor.</p>
        <ul className="mb-4 list-inside list-disc">
          <li>
            <span className="font-bold">фызым и нэр</span> (fəzən jə nar): the woman&apos;s eyes
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-2xl font-semibold">Instrumental</h2>
        <p className="mb-4">It can denote an instrumental meaning.</p>
        <ul className="mb-4 list-inside list-disc">
          <li>
            <span className="font-bold">сабийр къалэмкIэ матхэ</span> (saːbəjr qaːɮamtʃʼa maːtxa):
            the child writes <span className="italic">with the pen</span>
          </li>
          <li>
            <span className="font-bold">дэ тенджызым кхъухьлъатэкIэ дылъэтащ</span> (da tajndʒəzəm
            qχʷəħɬaːtatʃʼa dəɬataːɕ): we flew to the sea{" "}
            <span className="italic">with a plane</span>
          </li>
        </ul>

        <p className="mb-4">It can denote the direction.</p>
        <ul className="mb-4 list-inside list-disc">
          <li>
            <span className="font-bold">бгым тет унэмкIэ маплъэ</span> (bɣəm tajt wənamtʃʼa maːpɬa):
            he looks <span className="italic">towards the house</span> standing on a hill
          </li>
        </ul>
      </section>
    </div>
  );
}
