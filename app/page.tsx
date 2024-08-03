"use client"
import Image from "next/image";

import { Container } from "./components/Container";

import heroImg from "./assets/images/hero.png"
import Link from "next/link";
import LandingHeader from "./components/LandingHeader";
import LandingCategories from "./components/LandingCategories";
import LandingSection from "./components/LandingSection";
import LandingCTA from "./components/LandingCTA";
import LandingGettingStarted from "./components/LandingGettingStarted";
import LandingNewsletter from "./components/LandingNewsletter";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
        <LandingHeader/>
        <div className="px-32">
        <LandingCategories/>
        <LandingSection title={"Popular Events in Ariana"}/>
        <LandingGettingStarted/>
        <LandingSection title={"Discover Best of Online Events"}/>
        <LandingSection title={"Trending Events Around the World"}/>
        </div>
        <LandingCTA/>
        <LandingNewsletter/>
        <Footer/>
    </>
  );
}
