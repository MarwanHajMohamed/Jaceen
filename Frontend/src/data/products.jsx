import Alpha from "../assets/alpha.png";
import Alpha2 from "../assets/alpha_2.png";
import Energise from "../assets/energise.png";
import Shilajit from "../assets/shilajit.jpg";
import Growth from "../assets/growth.jpg";
import Growth2 from "../assets/Growth_2.png";
import CBD from "../assets/cbd.jpg";
import CBDOil from "../assets/cbd_oil.jpeg";
import Immune from "../assets/immune.png";
import ImmuneAF from "../assets/immune_alcohol_free.jpeg";
import Patchouli from "../assets/patchouli.jpeg";
import Jasmine from "../assets/jasmine.jpeg";
import PatchJasmine from "../assets/patch_jasmine.jpeg";
import SkinSerum from "../assets/skin_serum.jpeg";
import Toning from "../assets/toning.jpeg";
import HairSerum from "../assets/hair_serum.jpeg";
import HairSkinToning from "../assets/hair_skin_toning.jpeg";
import Beginner from "../assets/training-programmes.jpeg";
import Advanced from "../assets/training_programmes_advanced.jpeg";

export const products = [
  {
    id: 1,
    name: "Alpha",
    price: 35,
    category: "Sports Nutrition",
    imgs: [Alpha, Alpha2],
    description: (
      <div>
        <p>
          Jaceen ALPHA is a natural herbal supplement derived from the highest
          quality of organically cultivated herbal extracts which combine
          synergistically to invigorate male hormonal and reproductive health.
        </p>
        <p>
          Formulated using only research proven extracts, ALPHA will contribute
          towards healthy testosterone levels, increased fertility and an
          increase in libido. You may also experience an increase in muscular
          size, strength and endurance.
        </p>
        <p>Benefits of Alpha?</p>
        <ul>
          <li>
            Stimulates the leydig cells of the testes to increase the production
            of testosterone
          </li>
          <li>
            Rich in various research proven extracts which prevent the
            conversion of testosterone to DHT by blockage of the alpha reductase
            enzyme
          </li>
          <li>
            Rich in research proven natural compounds which increase muscular
            mass, muscular strength and bone density
          </li>
          <li>Helps to promote a decrease in body fat levels</li>
          <li>
            Rich in over 90 essential micronutrients which aid towards healthy
            sperm production, a healthy libido and male reproductive health
          </li>
          <li>
            Inhibits excessive production of cortisol from the adrenal glands.
            Cortisol reduces blood testosterone levels, ALPHA combats increased
            levels of cortisol therefore preventing the reduction of blood
            testosterone levels
          </li>
          <li>Promotes vasodilation to combat erectile dysfunction</li>
        </ul>
      </div>
    ),
    why_jaceen: (
      <div>
        <h4>Organic Ingredients</h4>
        <li>
          We have only used the highest quality of organic herbs to ensure our
          immune support tincture is of the highest quality.
        </li>
        <h4>Strength Guarantee</h4>
        <li>
          At Jaceen, we use a unique exotic blend of various research proven
          herbs that all combine in synergy to implement a powerful immune
          boosting benefits. All the ingredients we use come in high
          concentrations to ensure maximal strength and potency.
        </li>
      </div>
    ),
    product_highlights: (
      <div>
        <h4>Forskolin</h4>
        <li>
          Research based studies have exemplified the potential of forskolin to
          promote healthy testosterone levels whilst also improving body
          composition by reducing body fat.
        </li>
        <h4>Ashwagandha</h4>
        <li>
          Elevated cortisol levels may reduce testosterone levels. Studies have
          shown that ashwagandha has the ability to reduce cortisol levels which
          can further promote healthier testosterone levels.
        </li>
      </div>
    ),
    how_to_use: (
      <div>
        <p>
          Shake well before use. Use approximately 5-10 drops (1 teaspoon) twice
          daily, once in the morning and once post exercise.
        </p>
      </div>
    ),
    ingredients: (
      <div>
        <p>
          Ethanol, purified water, ashwagandha extract, Korean ginseng extract,
          yohimbine extract, tongkat ali extract, shilajit extract, clove
          extract, saw palmetto extract, nutmeg extract, fenugreek extract,
          forskolin extract, L-Arginine, Pycnogenol, Vitamin D3, withanolides,
          sitoindosides, diterpenes.
        </p>
      </div>
    ),
    reviews: [
      {
        name: "Alfie",
        review:
          "6 days in and I already feel very energetic during my workouts. I have it twice daily, once with my morning smoothie and once with my post workout shake",
        date: "08/06/2021",
        rating: 5,
      },
      {
        name: "Jack",
        review:
          "2 weeks of use and I feel more energetic, recovery from training has also improved.",
        date: "17/08/2021",
        rating: 5,
      },
      {
        name: "Brian",
        review:
          "Helped a lot with my stress and general lack of energy. I feel a lot more energetic since I’ve started using alpha. I haven’t noticed a difference in my strength that’s why it’s a 4 star from me but I’ll definitely still be ordering again!",
        date: "08/09/2021",
        rating: 4,
      },
    ],
  },
  {
    id: 2,
    name: "ENERGISE",
    price: 45,
    category: "Sports Nutrition",
    imgs: [Energise],
    description: (
      <div>
        <p>
          ENERGISE is a highly advanced natural metabolism boosting supplement
          which promotes an increase in energy production, thermogenesis and
          lipolysis. We have intricately utilised the most potent research
          proven extracts which combine synergistically to increase the basal
          metabolic rate (BMR) which will consequently contribute to an increase
          in fat loss when combined with an effective exercise routine and a
          caloric deficit. ENERGISE will also provide you with a boost in energy
          by stimulating the mitochondria of your cells and is therefore a
          healthier, nutritious and more effective alternative to the coffee
          many of us have in the morning.
        </p>
      </div>
    ),
    why_jaceen: (
      <div>
        <h4>Organic Ingredients</h4>
        <li>
          We have only used the highest quality of organic ingredients to ensure
          ENERGISE is highly effective.
        </li>
        <h4>Strength Guarantee</h4>
        <li>
          ENERGISE utilises a unique exotic blend of various research proven
          ingredients that all combine in synergy to implement a powerful
          metabolism boosting effect which can consequently contribute towards
          greater fat loss. All the ingredients we use come in high
          concentrations to ensure maximal strength and potency.
        </li>
        <h4>Capsaicin</h4>
        <li>
          Several research based studied have exemplified the potential
          metabolism boosting effects of capsaicin. Controlled experimental
          studies have also suggested that the use of capsaicin can contribute
          to further fat loss via thermogenesis.
        </li>
      </div>
    ),
    product_highlights: (
      <div>
        <h4>Forskolin</h4>
        <li>
          A potent plant extract which has exemplified an ability to increase
          fat loss in numerous evidence based studies via the activation of
          enzymes which degrade adipose (fat) tissue more efficiently.
        </li>
        <h4>Green Coffee Bean Extract</h4>
        <li>
          Rich in chlorogenic acid which had been research proven to potentially
          elicit anti-diabetic, anti-inflammatory and anti-obesity effects.
        </li>
        <h4>CoQ10</h4>
        <li>
          CoQ10 is produced naturally by the body and stored in the mitochondria
          of the cells. It is responsible for the production of Adenosine
          Triphosphate (ATP), the molecule responsible for energy transfer
          within cells. CoQ10 has also been research proven to reduce oxidative
          stress and increase exercise performance.
        </li>
      </div>
    ),
    how_to_use: (
      <div>
        <p>
          Mix 1 scoop with water upon waking on an empty stomach. You may also
          consume ENERGISE prior to exercise to further accelerate your
          metabolism and maximise fat loss. Assess your tolerance before
          gradually increasing the dosage to 2 scoops. Do NOT exceed 2 scoops.
        </p>
      </div>
    ),
    ingredients: (
      <div>
        <p>
          Matcha Green Tea extract, Dandelion Root extract, Yerba Mate extract,
          Ginger Extract, Rhodiola extract, Garcinia Cambogia extract, Camu Camu
          extract, Green Coffee Bean extract, Coleus Forskolin extract, CoEnzyme
          Q10, Capsaicin.{" "}
        </p>
      </div>
    ),
    reviews: [],
  },
  {
    id: 3,
    name: "Pure Himalayan Shilajit",
    price: 30,
    category: "Sports Nutrition",
    imgs: [Shilajit],
    description: (
      <div>
        <p>
          Our pure Himalayan shilajit resin is a rare natural substance
          comprised of over 80 minerals and various health enriching compounds.
        </p>
        <p>
          Numerous evidence based studies have showcased the potential of pure
          shilajit resin to elevate natural testosterone production, increase
          muscular strength, promote healthy cognitive function and also improve
          fertility
        </p>
        <p>
          An imperative supplement which is highly recommended for all those who
          wish to invigorate their health and performance
        </p>
      </div>
    ),
    why_jaceen: (
      <div>
        <h4>Strength Guarantee</h4>
        <li>
          The most beneficial and active compound within shilajit which is known
          to elicit the various health promoting effects is known as fulvic
          acid, our shilajit resin contains over 78% of this potent compound
          which is substantially higher than all other shilajits containing
          products on the market
        </li>
        <h4>Contaminant Free</h4>
        <li>
          Many shilajit products on the market contain various contaminants
          which can be detrimental to your health and wellbeing, at Jaceen we
          always prioritise customer satisfaction and wellness hence why we have
          ensured that our shilajit is free from all harmful contaminants and
          chemicals
        </li>
      </div>
    ),
    product_highlights: (
      <div>
        <h4>&gt;78% Fulvic Acid</h4>
        <p>
          Fulvic acid has showcased immense potential in various research based
          studies to promote hormonal, cognitive, cardiovascular, pulmonary and
          anti inflammatory benefits. To maximise these health benefits we have
          sourced the most powerful shilajit resin with the highest content of
          fulvic acid
        </p>
      </div>
    ),
    how_to_use: (
      <div>
        <p>
          Using the spoon provided, take a pea sized serving of the shilajit
          resin and dissolve thoroughly in lukewarm water/milk/coffee
        </p>
        <p>
          Consume daily on an empty stomach to obtain all the health promoting
          benefits
        </p>
      </div>
    ),
    ingredients: (
      <div>
        <p>Pure Himalayan shilajit resin</p>
      </div>
    ),
    reviews: [],
  },
  {
    id: 4,
    name: "Growth",
    price: 50,
    category: "Sports Nutrition",
    imgs: [Growth, Growth2],
    description: (
      <div>
        <p>
          Growth is a premium protein powder supplement which has been
          intricately formulated to promote muscular growth, strength and
          recovery.
        </p>
        <p>
          Growth contains a powerful blend of grass fed whey isolate and organic
          pea isolate to ensure the most effective amino acid profile which will
          yield maximal benefits and ensure the highest rates of muscular
          growth, strength and recovery to help you achieve your health and
          wellbeing goals
        </p>
      </div>
    ),
    why_jaceen: (
      <div>
        <h4>Organic ingredients</h4>
        <li>
          Growth contains organic pea protein isolate and organic cacao extract
          to ensure maximal efficacy
        </li>
        <h4>High protein content</h4>
        <li>
          Growth contains a staggering 33 grams of high quality protein per
          serving which dwarfs the amount of 22 grams per serving offered by
          most leading protein supplements
        </li>
        <h4>No artificial flavours</h4>
        <li>
          Our goal is to maximise your health and performance hence why Growth
          contains absolutely no artificial flavourings, colours or
          preservatives which we believe can have harmful effects. We have only
          used the highest quality of natural ingredients to ensure maximal
          effectiveness with no side effects
        </li>
      </div>
    ),
    product_highlights: (
      <div>
        <h4>Organic cacao extract</h4>
        <li>
          A potent natural plant extract which contains a range of health
          benefits whilst also providing a natural, rich and elegant chocolate
          flavour
        </li>
        <h4>Leucine</h4>
        <li>
          Research proven to play a key role in protein synthesis, leucine is
          essential towards muscular growth, strength and recovery. Growth
          contains a significant amount of leucine which will further elevate
          levels of protein synthesis to ensure you can achieve greater rates of
          muscular growth and recovery
        </li>
        <h4>Low in lactose, sugars and fat</h4>
        <li>
          Growth is naturally very low in lactose which helps digestion and
          minimises the risk of bloating or other stomach dilemmas. Unlike most
          other leading protein powder providers, Growth is also very low in
          sugars and fats
        </li>
      </div>
    ),
    how_to_use: (
      <div>
        <p>
          Add 1 scoop (40g) of growth to 200ml of water and mix well. Use 1-3
          servings per day to increase your daily protein intake and maximise
          muscular growth, recovery and strength. Take alongside Alpha for
          further benefits
        </p>
        <p>
          You may also add Growth to your smoothies, shakes, oats and other
          foods to elevate the protein content and add a luxurious chocolate
          taste.
        </p>
      </div>
    ),
    ingredients: (
      <div>
        <p>
          Whey protein isolate, organic pea protein isolate, organic cacao
          extract, leucine, stevia leaf extract
        </p>
      </div>
    ),
    reviews: [],
  },
  {
    id: 5,
    name: "Organic CBD Balm",
    price: 80,
    category: "Sports Nutrition",
    imgs: [CBD],
    description: (
      <div>
        <p>
          Our full spectrum organic CBD balm is the most potent available in the
          market with an immense CBD content of 5000mg per tub. We have
          intricately utilised a range of natural extracts which synergistically
          compliment the active cannabinoids to reinforce the pain and
          inflammation alleviating effects. These benefits will be of particular
          help towards athletes and those who engage in physical activity often
          or those who experience chronic pain and inflammation due to
          conditions such as arthritis
        </p>
      </div>
    ),
    why_jaceen: (
      <div>
        <h4>Strength Guarantee</h4>
        <li>
          Our CBD Balm is the most potent and powerful available in the market
          with a vast CBD content of 5000mg per tub, this greatly increases the
          potency and effective benefits of our balm in comparison to those with
          a weaker CBD content
        </li>
        <h4>Curcumin</h4>
        <li>
          Our balm does not simply contain CBD but it has also been enriched
          with other research proven ingredients which further the inflammation
          and pain reducing effects. Numerous evidence based studies have
          exemplified the benefits of curcumin at reducing inflammation
        </li>
      </div>
    ),
    product_highlights: (
      <div>
        <h4>MSM</h4>
        <li>
          MSM is a potent anti-inflammatory which has been used to treat
          osteoarthritis, tendonitis and rheumatoid arthritis
        </li>
        <h4>Full Spectrum</h4>
        <li>
          Our balm contains all active cannabinoids along with terpenes and
          flavonoids to ensure an added influx of therapeutic benefits
        </li>
      </div>
    ),
    how_to_use: (
      <div>
        <p>For topical use only</p>
        <p>
          For maximal effectiveness, gently massage the balm into the affected
          region thoroughly whilst ensuring that all areas are covered. Use 3/4
          times daily
        </p>
        <p>Do NOT apply to open wounds, grazes or cuts</p>
      </div>
    ),
    ingredients: (
      <div>
        <p>
          CBD Oil, Wormwood, Soybean Wax, Aloe Vera, Avocado Oil, Curcumin,
          Menthol, MSM, Arnica, Primrose Oil, Peppermint Extract, Wintergreen
          Oil
        </p>
      </div>
    ),
    reviews: [],
  },
  {
    id: 6,
    name: "Immune",
    price: 35,
    category: "Sports Nutrition",
    imgs: [Immune],
    description: (
      <div>
        <p>
          Your first line of defence against infection and illnesses. Our
          natural organic herbal tincture is derived from the highest quality of
          cultivated herbs to ensure maximal immune support. Your body will be
          nourished by various micronutrients all of which have been research
          proven to empower your immune system. Additional natural compounds
          within each herbal extract also elicit natural antiviral properties to
          offer greater protection whilst minimising risk during the current
          virus outbreak.
        </p>
        <p>
          Another prominent factor which contributes to immune dysfunction is
          the accumulation of elevated stress levels, we have intricately
          utilised adaptogens within our herbal mixture to ignite homeostasis
          and restore natural immune function. Adaptogens work via the two
          control systems of the human body, the HPA axis (hypothalamus,
          pituitary, adrenal axis) and SAS (sympathetic adrenal system).
          Adaptogens therefore balance our natural physiological systems which
          have been disrupted by stress, they also invigorate our immune
          response. If the immune system becomes overactive due to potential
          allergens, adaptogenic herbs will help to regulate the immune system,
          reduce hypersensitivity and consequently mitigate symptoms of allergy.
        </p>
      </div>
    ),
    why_jaceen: undefined,
    product_highlights: undefined,
    how_to_use: undefined,
    ingredients: undefined,
    reviews: [],
  },
  {
    id: 7,
    name: "Immune Alcohol Free",
    price: 30,
    category: "Sports Nutrition",
    imgs: [ImmuneAF],
    description: (
      <div>
        <p>
          Your first line of defence against infection and illnesses. Our
          alcohol free version of IMMUNE is derived from the highest quality of
          cultivated herbs to ensure maximal immune support. Your body will be
          nourished by various micronutrients all of which have been research
          proven to empower your immune system. Additional natural compounds
          within each herbal extract also elicit natural antiviral properties to
          offer greater protection whilst minimising risk during the current
          virus outbreak.
        </p>
        <p>
          Another prominent factor which contributes to immune dysfunction is
          the accumulation of elevated stress levels, we have intricately
          utilised adaptogens within our herbal mixture to ignite homeostasis
          and restore natural immune function. Adaptogens work via the two
          control systems of the human body, the HPA axis (hypothalamus,
          pituitary, adrenal axis) and SAS (sympathetic adrenal system).
          Adaptogens therefore balance our natural physiological systems which
          have been disrupted by stress, they also invigorate our immune
          response. If the immune system becomes overactive due to potential
          allergens, adaptogenic herbs will help to regulate the immune system,
          reduce hypersensitivity and consequently mitigate symptoms of allergy.
        </p>
      </div>
    ),
    why_jaceen: (
      <div>
        <h4>Organic Ingredients</h4>
        <li>
          We have only used the highest quality of organic herbs to ensure our
          immune support tincture is of the highest quality.
        </li>
        <h4>Strength Guarantee</h4>
        <li>
          At Jaceen, we use a unique exotic blend of various research proven
          herbs that all combine in synergy to implement a powerful immune
          boosting benefits. All the ingredients we use come in high
          concentrations to ensure maximal strength and potency.
        </li>
        <h4>Vitamin C and Vitamin D</h4>
        <li>
          Vitamin C and Vitamin D are both beyond imperative for the maintenance
          of optimal health and immune function. We’ve therefore also added both
          of these vitamins to our tincture, 2 servings alone will provide you
          with your RDA. Recent studies have shown that Vitamin D deficiency is
          a major risk factor to potential serious symptoms from Coronavirus
          infection hence why we have made it a priority in our immune support
          tincture.
        </li>
      </div>
    ),
    product_highlights: (
      <div>
        <h4>Echinacea</h4>
        <li>
          Evidence based studies have exemplified the ability of phytochemicals
          within echinacea to reduce virus infections whilst also boosting
          immune health
        </li>
        <h4>Astralagus root</h4>
        <li>
          Scientific studies have shown astralagus to elicit antiviral and
          adaptogenic properties to stimulate the immune system
        </li>
        <h4>Mushroom complex</h4>
        <li>
          The combination of turkey tail, reishi and chaga mushroom creates a
          powerful mushroom complex which helps to invigorate the immune system.
          Studies have shown that the turkey tail mushroom is able to boost the
          immune response by increasing antiviral cytokines.
        </li>
      </div>
    ),
    how_to_use: (
      <div>
        <p>
          Shake well before use. Use approximately 5-10 drops (1 teaspoon) twice
          daily on an empty stomach, you may have combine IMMUNE with any liquid
          solution including water.
        </p>
      </div>
    ),
    ingredients: (
      <div>
        <p>
          Glycerin, Spirulina, astralagus root, echinacea, curcumin, elderberry,
          oregano, cordiceps, turkey tail mushroom extract, reishi mushroom
          extract, chaga mushroom extract, dandelion root, liquorice root,
          burdock, wormwood, star anise, glycyrrhizin, vitamin D3, vitamin C …
        </p>
      </div>
    ),
    reviews: [],
  },
  {
    id: 8,
    name: "Organic CBD Oil",
    price: 60,
    category: "Sports Nutrition",
    imgs: [CBDOil],
    description: (
      <div>
        <p>
          CBD (cannabidiol) is a potent cannabinoid which encompasses the
          ability to relieve pain, anxiety, stress and inflammation. By reacting
          with the intrinsic human endocannabinoid system, CBD is able to bind
          to various receptors throughout our body to elicit calming,
          pain/reducing, anti-inflammatory effects.
        </p>
        <p>
          Anxiety, stress and pain are three of the most prominent causes of
          insomnia; a further lack of sleep has been proven to further
          exacerbate these conditions. CBD relaxes our peripheral nervous system
          and therefore has the ability to promote a deep sleep whilst also
          reducing cortisol levels to combat anxiety and stress. At Jaceen we
          have also incorporated valerian root extract into our CBD oil,
          valerian root has been research proven to promote better sleep whilst
          mitigating symptoms of insomnia, in combination with CBD the sleep
          promoting effects will be further invigorated.
        </p>
        <p>
          Several evidence based studies have elucidated the ability of CBD to
          relax our nervous system hence its frequent by medical professionals
          amongst those with neurological conditions such as epilepsy, CBD has
          also performed incredibly well in studies measuring its ability to
          relieve chronic inflammation and pain.
        </p>
        <p>
          Unlike sleeping tablets or other synthetic chemical based drugs used
          to promote sleep, CBD does not cause you to feel drowsy or lethargic
          during the day. CBD promotes homeostasis and helps users to function
          at optimal health.
        </p>
      </div>
    ),
    why_jaceen: (
      <div>
        <h4>Full Spectrum CBD Oil</h4>
        <li>
          Most leading providers of CBD oil use a CBD isolate, at Jaceen our CBD
          oil is full spectrum and therefore contains all the beneficial
          cannabinoids. Full spectrum CBD oils have been research proven to be
          more effective due to the variety of different cannabinoids working
          synergistically to reinforce the health promoting effects.
        </li>
        <h4>Organic CBD Oil</h4>
        <li>
          Our CBD oil is sourced from the highest quality organic ingredients
          only.
        </li>
        <h4>Strength Guarantee</h4>
        <li>
          Our CBD oil is of a very high strength containing 3000mg of CBD in
          each 30ml bottle, corresponding to 10% CBD. This means more active
          cannabinoids will be available in each dose therefore eliciting
          greater health benefits.
        </li>
      </div>
    ),
    product_highlights: (
      <div>
        <h4>CBD</h4>
        <li>
          Research proven to help tackle insomnia, epilepsy, anxiety, stress,
          inflammation and chronic pain.
        </li>
        <h4>Valerian Root Extract</h4>
        <li>
          Research proven to induce sleep whilst also increasing the quality of
          sleep.
        </li>
      </div>
    ),
    how_to_use: (
      <div>
        <p>
          CBD dosage is entirely dependent upon your needs and the severity of
          the symptoms you may be seeking to treat. Factors such as bodyweight
          and tolerance may also have an impact so please do refer to the
          diagram we have provided for an indication of the right dosage you
          should be going for. We also highly recommend that you start at the
          lower end before increasing your dosage especially if you have never
          used CBD before.
        </p>
        <p>
          Each drop of our CBD contains 5mg of CBD, we recommend a dosage of 3-5
          drops to begin with which provides 15-25mg of CBD. If necessary
          according to your symptoms, weight or symptoms, you may increase the
          amount of drops you take but please always refer to the diagram we
          have provided.
        </p>

        <p>
          For maximal effectiveness we recommend sublingual administration.
          Place the required amount of drops under your tongue and hold it there
          for 60 seconds before swallowing.
        </p>
        <p>Ensure you shake thoroughly every time before use.</p>
      </div>
    ),
    ingredients: (
      <div>
        <p>
          Organic hemp seed oil, full spectrum CBD extract, valerian root
          extract
        </p>
      </div>
    ),
    reviews: [],
  },
  {
    id: 9,
    name: "Patchouli Wood Natural Body Roll-on",
    price: 15,
    category: "Skin Care",
    imgs: [Patchouli],
    description: (
      <div>
        <p>
          Combining the elegant natural aromas of sandalwood, cedarwood,
          patchouli and frankincense; Patchouli Wood will enrich your body with
          a powerful musky wood scent.
        </p>
        <p>
          Our natural organic body roll on aims to eliminate body odour whilst
          also providing the skin with an essence of rejuvenation and hydration.
          The combination of natural exotic plant extracts will exhibit a long
          lasting, soothing, refreshing aroma. Exotic plant extracts that we
          have utilised to formulate our deodorant elicit natural antibacterial
          properties which will work against odour causing bacteria and
          therefore prevent the accumulation of unpleasant odours.
        </p>
      </div>
    ),
    why_jaceen: (
      <div>
        <h4>Aluminium Free</h4>
        <li>
          Most leading brands use chemicals within their deodorants that can
          irritate and harm the body. Aluminium is another prominent ingredient
          that is used amongst most leading deodorants, aluminium blocks sweat
          ducts and therefore prevents the release of toxins. Sweating is a
          natural process regulated by the human body to control core
          temperature and eliminate toxins from the body it is therefore
          potentially harmful to block sweat glands. Our roll on is completely
          free from aluminium and other synthetic compounds, our formula aims to
          eliminate the odour causing bacteria to prevent the development of
          unpleasant odours. Aluminium blocks sweating but still allows odour
          causing bacteria to thrive.
        </li>
        <h4>Antibacterial Extracts</h4>
        <li>
          Our deodorant formula contains various natural antibacterial extracts
          from plants such as tea tree and eucalyptus. Research based studies
          have exemplified the powerful antibacterial effects that these plants
          possess, body odour is caused by bacteria and a build up of bacteria
          can cause major unpleasant odours. Our deodorant will prevent the
          growth of these bacteria whilst also allowing the body to sweat and
          eliminate toxins to maintain optimal health.
        </li>
      </div>
    ),
    product_highlights: (
      <div>
        <h4>Sandalwood</h4>
        <li>
          Sandalwood is one of most expensive woods worldwide due to its ability
          to retain its unique fragrance for decades, at Jaceen we have used the
          highest quality of luxurious sandalwood cultivated in India.
          Sandalwood possesses antiseptic properties and is also rich in various
          antioxidants which can prevent the formation of wrinkles.
        </li>
        <h4>Aloe Vera</h4>
        <li>
          The underarm region is very sensitive and vulnerable to irritation and
          dryness. Our formula contains aloe vera extract which soothes,
          hydrates and cleanses skin without causing any damage.
        </li>
        <h4>Tea Tree</h4>
        <li>
          Excessive sweating harbours an optimal environment for odour causing
          bacteria. We have utilised tea tree extract to eliminate these
          bacteria, research based studies have exemplified the efficacy of tea
          tree when used as an antibacterial agent.
        </li>
        <h4>Eucalyptus</h4>
        <li>
          Similarly to tea tree, eucalyptus also exhibits antibacterial
          properties and will therefore help to eliminate body odour whilst
          leaving a refreshing aroma.
        </li>
      </div>
    ),
    how_to_use: (
      <div>
        <p>
          Gently apply to underarms, neck and other areas of the body once
          thoroughly cleansed as required. Do not apply to face or other
          sensitive regions.
        </p>
      </div>
    ),
    ingredients: (
      <div>
        <p>
          Rosehip extract, aloe vera oil, tea tree extract, eucalyptus essential
          extract, cedarwood extract, patchouli extract, sandalwood extract,
          frankincense extract
        </p>
      </div>
    ),
    reviews: [],
  },
  {
    id: 10,
    name: "Royal Jasmine Natural Body Roll-on",
    price: 15,
    category: "Skin Care",
    imgs: [Jasmine],
    description: (
      <div>
        <p>
          Royal Jasmine encompasses a luxurious scent which entails the natural
          aromas of rose, jasmine and bergamot. These illustrious scents all
          combine in synergy to formulate a sweet vibrant fragrance.
        </p>
        <p>
          Our natural organic body roll on aims to eliminate body odour whilst
          also providing the skin with an essence of rejuvenation and hydration.
          The combination of natural exotic plant extracts will exhibit a long
          lasting, soothing, refreshing aroma. Exotic plant extracts that we
          have utilised to formulate our deodorant elicit natural antibacterial
          properties which will work against odour causing bacteria and
          therefore prevent the accumulation of unpleasant odours.
        </p>
      </div>
    ),
    why_jaceen: (
      <div>
        <h4>Aluminium Free</h4>
        <li>
          Most leading brands use chemicals within their deodorants that can
          irritate and harm the body. Aluminium is another prominent ingredient
          that is used amongst most leading deodorants, aluminium blocks sweat
          ducts and therefore prevents the release of toxins. Sweating is a
          natural process regulated by the human body to control core
          temperature and eliminate toxins from the body it is therefore
          potentially harmful to block sweat glands. Our roll on is completely
          free from aluminium and other synthetic compounds, our formula aims to
          eliminate the odour causing bacteria to prevent the development of
          unpleasant odours. Aluminium blocks sweating but still allows odour
          causing bacteria to thrive.
        </li>
        <h4>Antibacterial Extracts</h4>
        <li>
          Our deodorant formula contains various natural antibacterial extracts
          from plants such as tea tree and eucalyptus. Research based studies
          have exemplified the powerful antibacterial effects that these plants
          possess, body odour is caused by bacteria and a build up of bacteria
          can cause major unpleasant odours. Our deodorant will prevent the
          growth of these bacteria whilst also allowing the body to sweat and
          eliminate toxins to maintain optimal health.
        </li>
      </div>
    ),
    product_highlights: (
      <div>
        <h4>Rose</h4>
        <li>
          Along with its exotic sweet aroma, rose extract also hydrates skin and
          elicits antibacterial properties to eliminate the presence of odour
          causing bacteria.
        </li>
        <h4>Aloe Vera</h4>
        <li>
          The underarm region is very sensitive and vulnerable to irritation and
          dryness. Our formula contains aloe vera extract which soothes,
          hydrates and cleanses skin without causing any damage.
        </li>
        <h4>Tea Tree</h4>
        <li>
          Excessive sweating harbours an optimal environment for odour causing
          bacteria. We have utilised tea tree extract to eliminate these
          bacteria, research based studies have exemplified the efficacy of tea
          tree when used as an antibacterial agent.
        </li>
        <h4>Eucalyptus</h4>
        <li>
          Similarly to tea tree, eucalyptus also exhibits antibacterial
          properties and will therefore help to eliminate body odour whilst
          leaving a refreshing aroma.
        </li>
      </div>
    ),
    how_to_use: (
      <div>
        <p>
          Gently apply to underarms, neck and other areas of the body once
          thoroughly cleansed as required. Do not apply to face or other
          sensitive regions.
        </p>
      </div>
    ),
    ingredients: (
      <div>
        <p>
          Rosehip extract, aloe vera oil, tea tree extract, eucalyptus extract,
          rose extract, bergamot extract, jasmine extract
        </p>
      </div>
    ),
    reviews: [],
  },
  {
    id: 11,
    name: "Royal Jasmine & Patchouli Wood Body Roll-on Twin Pack",
    price: 25,
    category: "Skin Care",
    imgs: [PatchJasmine],
    description: undefined,
    why_jaceen: undefined,
    product_highlights: undefined,
    how_to_use: undefined,
    ingredients: undefined,
    reviews: [],
  },
  {
    id: 12,
    name: "Skin Repair Serum",
    price: 55,
    category: "Skin Care",
    imgs: [SkinSerum],
    description: (
      <div>
        <p>
          Our exotic skin repair serum involves a combination of a wide range of
          natural organic extracts which contain various minerals, vitamins and
          fatty acids that are all essential for having healthy radiant skin.
          High concentrations of antioxidants also ensure prevention of
          oxidative damage therefore encouraging revitalisation.
        </p>
        <li>50ml</li>
        <li>Suitable for all skin types including sensitive skin</li>
        <li>Alcohol-free</li>
        <h4>Disclaimer</h4>
        <li>
          May contain traces of nuts/seeds – For allergy advice, please ensure
          you read the ingredients label prior to use, if unsure, apply a small
          amount of the product to your skin as part of a patch test
        </li>
      </div>
    ),
    why_jaceen: undefined,
    product_highlights: undefined,
    how_to_use: undefined,
    ingredients: undefined,
    reviews: [],
  },
  {
    id: 13,
    name: "Toning Solution",
    price: 25,
    category: "Skin Care",
    imgs: [Toning],
    description: (
      <div>
        <p>
          Our cooling toning solution contains a blend of numerous organic plant
          extracts which aim to nourish and hydrate the skin while restoring its
          natural delicate beauty. With a range of antioxidants and
          anti-inflammatory compounds, this toner is designed to protect against
          environmental damage and allow you to work towards achieving a
          flawless luminous complexion.
        </p>
        <li>100ml</li>
        <li>Alcohol free</li>
        <li>Suitable for all skin types</li>
        <li>Soothes, cleanses and rehydrates skin</li>
        <h4>Disclaimer</h4>
        <li>
          May contain traces of nuts/seeds. For allergy advice, please ensure
          you read the ingredients label prior to use, if unsure, apply a small
          amount of the product to your skin as part of a patch test
        </li>
      </div>
    ),
    why_jaceen: (
      <div>
        <h4>Natural Ingredients</h4>
        <li>
          At Jaceen we only use natural ingredients and no chemicals or
          synthetic compounds. This ensures that your skin is free from contact
          with any potential irritants such as alcohol. Natural ingredients will
          also nourish your skin with an influx of minerals, vitamins, fatty
          acids and amino acids; all imperative components that the skin
          requires to retain optimal health.
        </li>
        <h4>Effective plant extracts</h4>
        <li>
          Our skin toner does not only use rose water and witch hazel like most
          leading suppliers of natural skin toners do. We’ve also utilised
          antibacterial plant extracts from tea tree to ensure your skin is
          nourished, hydrated and protected from potential breakouts.
        </li>
      </div>
    ),
    product_highlights: (
      <div>
        <h4>Witch Hazel</h4>
        <li>
          Witch hazel extract aims to tighten pores, cleanse the skin and reduce
          inflammation. It also exhibits astringent properties due to the
          presence of tannins which help to eliminate excess oils.
        </li>
        <h4>Lavender Extract</h4>
        <li>
          Lavender essential oil may alleviate to eczema and dry skin due to its
          natural antifungal properties. Natural antibacterial properties will
          also help to protect against acne.
        </li>
      </div>
    ),
    how_to_use: (
      <div>
        <p>
          Cleanse skin and then apply our natural toning solution with a clean
          cotton pad, distribute evenly all over face with gentle strokes.
        </p>
        <p>
          For maximum effectiveness use in combination with our natural skin
          repair serum. The toner must be applied prior to the serum.
        </p>
      </div>
    ),
    ingredients: (
      <div>
        <p>
          Aqua, Witch hazel extract, Rose water, Tea tree extract, Lavender
          extract, Glycolic acid, Potassium sorbate.
        </p>
      </div>
    ),
    reviews: [],
  },
  {
    id: 14,
    name: "Hair Growth Serum",
    price: 55,
    category: "Hair Care",
    imgs: [HairSerum],
    description: (
      <div>
        <p>
          Our revitalising hair growth serum contains a blend of premium organic
          plant extracts that are rich in various nutrients. These ingredients
          all work synergistically to help promote the growth of healthier,
          stronger and thicker hair. High concentrations of amino acids,
          vitamins and minerals combine to energise the scalp and leave you with
          luscious locks.
        </p>
        <li>50ml</li>
        <li>Suitable for all hair types</li>
        <li>Promotes healthier and stronger hair</li>
        <h4>Disclaimer</h4>
        <li>
          May contain traces of nuts/seeds. For allergy advice, please ensure
          you read the ingredients label prior to use, if unsure, apply a small
          amount of the product to your skin as part of a patch test
        </li>
      </div>
    ),
    why_jaceen: (
      <div>
        <h4>Organic guarantee</h4>
        <li>
          All the ingredients we have implemented into our hair serum are 100%
          organic. We’re comprehensive of how important hair and scalp health is
          hence why we have ensured that our customers can benefit from the
          highest quality of effective ingredients.
        </li>
        <h4>No chemicals, synthetics or parabens</h4>
        <li>
          Most leading haircare brands utilise various chemical compounds which
          can lead to hair and scalp damage. At Jaceen we only use natural plant
          extracts which aim to invigorate hair health with absolutely none of
          the side effects you would experience with synthetic hair products
        </li>
      </div>
    ),
    product_highlights: (
      <div>
        <h4>Rosemary extract</h4>
        <li>
          Research based studies have highlighted the effectiveness of this
          exotic plant extract in correspondence to hair growth. Rosemary
          extract promoted hair growth to the same extent as ‘Minoxidil’ which
          is currently the leading medical treatment for alopecia. Rosemary
          extract also exhibited less side effects than minoxidil.
        </li>
        <h4>Saw Palmetto extract</h4>
        <li>
          One of the main causes of androgenic alopecia is the build up of DHT,
          a derivative hormone of testosterone. Saw palmetto extract may help to
          block excess DHT and therefore prevent excessive hair loss and male
          pattern baldness.
        </li>
        <h4>Coffee bean extract</h4>
        <li>
          Caffeine accelerates blood flow in the scalp and therefore helps to
          prolong the hair growth cycle. Our organic coffee bean extract
          contains a high concentration of caffeine to ensure the hair follicles
          are consistently provided with a rich supply of blood and nutrients to
          maximise growth.
        </li>
      </div>
    ),
    how_to_use: (
      <div>
        <p>
          Caffeine accelerates blood flow in the scalp and therefore helps to
          prolong the hair growth cycle. Our organic coffee bean extract
          contains a high concentration of caffeine to ensure the hair follicles
          are consistently provided with a rich supply of blood and nutrients to
          maximise growth.
        </p>
      </div>
    ),
    ingredients: (
      <div>
        <p>
          Aloe vera oil, Rosemary extract, Pumpkin seed extract, Saw palmetto
          extract, Peppermint extract, Ginseng extract, Lavender extract,
          Cedarwood extract, Tea tree extract, Geranium extract, Clary Sage
          extract, Caffeine
        </p>
      </div>
    ),
    reviews: [],
  },
  {
    id: 15,
    name: "Hair Growth Serum, Toning Solution and Skin Repair Serum Trio",
    price: 110,
    category: "Hair Care",
    imgs: [HairSkinToning],
    description: undefined,
    why_jaceen: undefined,
    product_highlights: undefined,
    how_to_use: undefined,
    ingredients: undefined,
    reviews: [],
  },
  {
    id: 16,
    name: "8 Week Beginner Strength and Hypertrophy Programme",
    price: 30,
    category: "Training Programmes",
    imgs: [Beginner],
    description: undefined,
    why_jaceen: undefined,
    product_highlights: undefined,
    how_to_use: undefined,
    ingredients: undefined,
    reviews: [],
  },
  {
    id: 17,
    name: "8 Week Advanced Strength and Hypertrophy Programme",
    price: 40,
    category: "Training Programmes",
    imgs: [Advanced],
    description: undefined,
    why_jaceen: undefined,
    product_highlights: undefined,
    how_to_use: undefined,
    ingredients: undefined,
    reviews: [],
  },
];
