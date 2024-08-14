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
import Nav from "./components/Nav";
import { useEffect, useState } from "react";

export interface Event {
  title: string;
  description: string;
  dateTime: string;  
  hostName: string;
  ticketPrice: number;
  slots: number;
  pics: string[];  
  discount: number;
  tags: string[];
  id: string;
}

export default function Home() {
  const [data, setData] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        fetch('https://eea5ym4cdf.execute-api.us-east-1.amazonaws.com/dev/events')
            .then(response => response.json())
            .then((data: Event[]) => {
                setData(data);
                setIsLoading(false);
            })
            .catch((error: Error) => {
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div className="p-4">Loading...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-600">Error: {error}</div>;
    }
  return (
    <>
        <Nav/>
        <LandingHeader/>
        <div className="px-32">
        <LandingCategories/>
        <LandingSection data={data.slice(0, 6)} title={"Popular Events in Ariana"}/>
        <LandingGettingStarted/>
        <LandingSection data={data.slice(0, 6)} title={"Discover Best of Online Events"}/>
        <LandingSection data={data.slice(0, 6)} title={"Trending Events Around the World"}/>
        </div>
        <LandingCTA/>
        <LandingNewsletter/>
        <Footer/>
    </>
  );
}
