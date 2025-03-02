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
    title: "Alpha",
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
        <p>Organic Ingredients</p>
        <li>
          We have only used the highest quality of organic herbs to ensure our
          immune support tincture is of the highest quality.
        </li>
        <p>Strength Guarantee</p>
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
    reviews: [],
  },
  {
    id: 2,
    title: "Energise",
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
        <p>Organic Ingredients</p>
        <li>
          We have only used the highest quality of organic ingredients to ensure
          ENERGISE is highly effective.
        </li>
        <p>Strength Guarantee</p>
        <li>
          ENERGISE utilises a unique exotic blend of various research proven
          ingredients that all combine in synergy to implement a powerful
          metabolism boosting effect which can consequently contribute towards
          greater fat loss. All the ingredients we use come in high
          concentrations to ensure maximal strength and potency.
        </li>
        <p>Capsaicin</p>
        <li>
          Several research based studied have exemplified the potential
          metabolism boosting effects of capsaicin. Controlled experimental
          studies have also suggested that the use of capsaicin can contribute
          to further fat loss via thermogenesis.
        </li>
      </div>
    ),
    product_highlights: undefined,
    how_to_use: undefined,
    ingredients: undefined,
    reviews: [],
  },
  {
    id: 3,
    title: "Pure Himalayan Shilajit",
    price: 30,
    category: "Sports Nutrition",
    imgs: [Shilajit],
    description: undefined,
    why_jaceen: undefined,
    product_highlights: undefined,
    how_to_use: undefined,
    ingredients: undefined,
    reviews: [],
  },
  {
    id: 4,
    title: "Growth",
    price: 50,
    category: "Sports Nutrition",
    imgs: [Growth, Growth2],
    description: <div></div>,
    why_jaceen: undefined,
    product_highlights: undefined,
    how_to_use: undefined,
    ingredients: undefined,
    reviews: [],
  },
  {
    id: 5,
    title: "Organic CBD Balm",
    price: 80,
    category: "Sports Nutrition",
    imgs: [CBD],
    description: <div></div>,
    why_jaceen: undefined,
    product_highlights: undefined,
    how_to_use: undefined,
    ingredients: undefined,
    reviews: [],
  },
  {
    id: 6,
    title: "Immune",
    price: 35,
    category: "Sports Nutrition",
    imgs: [Immune],
    description: <div></div>,
    why_jaceen: undefined,
    product_highlights: undefined,
    how_to_use: undefined,
    ingredients: undefined,
    reviews: [],
  },
  {
    id: 7,
    title: "Immune Alcohol Free",
    price: 30,
    category: "Sports Nutrition",
    imgs: [ImmuneAF],
    description: <div></div>,
    why_jaceen: undefined,
    product_highlights: undefined,
    how_to_use: undefined,
    ingredients: undefined,
    reviews: [],
  },
  {
    id: 8,
    title: "Organic CBD Oil",
    price: 60,
    category: "Sports Nutrition",
    imgs: [CBDOil],
    description: <div></div>,
    why_jaceen: undefined,
    product_highlights: undefined,
    how_to_use: undefined,
    ingredients: undefined,
    reviews: [],
  },
  {
    id: 9,
    title: "Patchouli Wood Natural Body Roll-on",
    price: 15,
    category: "Skin Care",
    imgs: [Patchouli],
    description: <div></div>,
    why_jaceen: undefined,
    product_highlights: undefined,
    how_to_use: undefined,
    ingredients: undefined,
    reviews: [],
  },
  {
    id: 10,
    title: "Royal Jasmine Natural Body Roll-on",
    price: 15,
    category: "Skin Care",
    imgs: [Jasmine],
    description: <div></div>,
    why_jaceen: undefined,
    product_highlights: undefined,
    how_to_use: undefined,
    ingredients: undefined,
    reviews: [],
  },
  {
    id: 11,
    title: "Royal Jasmine & Patchouli Wood Body Roll-on Twin Pack",
    price: 25,
    category: "Skin Care",
    imgs: [PatchJasmine],
    description: <div></div>,
    why_jaceen: undefined,
    product_highlights: undefined,
    how_to_use: undefined,
    ingredients: undefined,
    reviews: [],
  },
  {
    id: 12,
    title: "Skin Repair Serum",
    price: 55,
    category: "Skin Care",
    imgs: [SkinSerum],
    description: <div></div>,
    why_jaceen: undefined,
    product_highlights: undefined,
    how_to_use: undefined,
    ingredients: undefined,
    reviews: [],
  },
  {
    id: 13,
    title: "Toning Solution",
    price: 25,
    category: "Skin Care",
    imgs: [Toning],
    description: <div></div>,
    why_jaceen: undefined,
    product_highlights: undefined,
    how_to_use: undefined,
    ingredients: undefined,
    reviews: [],
  },
  {
    id: 14,
    title: "Hair Growth Serum",
    price: 55,
    category: "Hair Care",
    imgs: [HairSerum],
    description: <div></div>,
    why_jaceen: undefined,
    product_highlights: undefined,
    how_to_use: undefined,
    ingredients: undefined,
    reviews: [],
  },
  {
    id: 15,
    title: "Hair Growth Serum, Toning Solution and Skin Repair Serum Trio",
    price: 110,
    category: "Hair Care",
    imgs: [HairSkinToning],
    description: <div></div>,
    why_jaceen: undefined,
    product_highlights: undefined,
    how_to_use: undefined,
    ingredients: undefined,
    reviews: [],
  },
  {
    id: 16,
    title: "8 Week Beginner Strength and Hypertrophy Programme",
    price: 30,
    category: "Training Programmes",
    imgs: [Beginner],
    description: <div></div>,
    why_jaceen: undefined,
    product_highlights: undefined,
    how_to_use: undefined,
    ingredients: undefined,
    reviews: [],
  },
  {
    id: 17,
    title: "8 Week Advanced Strength and Hypertrophy Programme",
    price: 40,
    category: "Training Programmes",
    imgs: [Advanced],
    description: <div></div>,
    why_jaceen: undefined,
    product_highlights: undefined,
    how_to_use: undefined,
    ingredients: undefined,
    reviews: [],
  },
];
