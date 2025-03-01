import Alpha from "../assets/alpha.png";
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
    imgs: [Alpha, Shilajit],
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
        </ul>
      </div>
    ),
  },
  {
    id: 2,
    title: "Energise",
    price: 45,
    category: "Sports Nutrition",
    imgs: [Energise],
    description: undefined,
  },
  {
    id: 3,
    title: "Pure Himalayan Shilajit",
    price: 30,
    category: "Sports Nutrition",
    imgs: [Shilajit],
    description: <div></div>,
  },
  {
    id: 4,
    title: "Growth",
    price: 50,
    category: "Sports Nutrition",
    imgs: [Growth, Growth2],
    description: <div></div>,
  },
  {
    id: 5,
    title: "Organic CBD Balm",
    price: 80,
    category: "Sports Nutrition",
    imgs: [CBD],
    description: <div></div>,
  },
  {
    id: 6,
    title: "Immune",
    price: 35,
    category: "Sports Nutrition",
    imgs: [Immune],
    description: <div></div>,
  },
  {
    id: 7,
    title: "Immune Alcohol Free",
    price: 30,
    category: "Sports Nutrition",
    imgs: [ImmuneAF],
    description: <div></div>,
  },
  {
    id: 8,
    title: "Organic CBD Oil",
    price: 60,
    category: "Sports Nutrition",
    imgs: [CBDOil],
    description: <div></div>,
  },
  {
    id: 9,
    title: "Patchouli Wood Natural Body Roll-on",
    price: 15,
    category: "Skin Care",
    imgs: [Patchouli],
    description: <div></div>,
  },
  {
    id: 10,
    title: "Royal Jasmine Natural Body Roll-on",
    price: 15,
    category: "Skin Care",
    imgs: [Jasmine],
    description: <div></div>,
  },
  {
    id: 11,
    title: "Royal Jasmine & Patchouli Wood Body Roll-on Twin Pack",
    price: 25,
    category: "Skin Care",
    imgs: [PatchJasmine],
    description: <div></div>,
  },
  {
    id: 12,
    title: "Skin Repair Serum",
    price: 55,
    category: "Skin Care",
    imgs: [SkinSerum],
    description: <div></div>,
  },
  {
    id: 13,
    title: "Toning Solution",
    price: 25,
    category: "Skin Care",
    imgs: [Toning],
    description: <div></div>,
  },
  {
    id: 14,
    title: "Hair Growth Serum",
    price: 55,
    category: "Hair Care",
    imgs: [HairSerum],
    description: <div></div>,
  },
  {
    id: 15,
    title: "Hair Growth Serum, Toning Solution and Skin Repair Serum Trio",
    price: 110,
    category: "Hair Care",
    imgs: [HairSkinToning],
    description: <div></div>,
  },
  {
    id: 16,
    title: "8 Week Beginner Strength and Hypertrophy Programme",
    price: 30,
    category: "Training Programmes",
    imgs: [Beginner],
    description: <div></div>,
  },
  {
    id: 17,
    title: "8 Week Advanced Strength and Hypertrophy Programme",
    price: 40,
    category: "Training Programmes",
    imgs: [Advanced],
    description: <div></div>,
  },
];
