import React from 'react';

const About = () => {
  const weirdFoods = [
    { name: "Kiviak (Greenland)", description: "Fermented small birds inside a seal's body." },
    { name: "Casu Marzu (Italy)", description: "Maggot cheese, banned in many places." },
    { name: "Hákarl (Iceland)", description: "Fermented shark meat with a strong ammonia smell." },
    { name: "Snake Soup (China)", description: "Made with various snakes, believed to have medicinal benefits." },
    { name: "Tuna Eyeballs (Japan)", description: "A delicacy that tastes like squid or octopus." },
    { name: "Fried Brain Sandwich (USA)", description: "Cow or pig brain sandwich popular in Southern Indiana." },
    { name: "Haggis (Scotland)", description: "Sheep's heart, liver, and lungs cooked inside the stomach." }
  ];

  return (
    <div>
      <h1>About Weird Foods</h1>
      <p>Here are some of the weirdest foods from around the world:</p>
      <ul>
        {weirdFoods.map((food, index) => (
          <li key={index}>
            <strong>{food.name}:</strong> {food.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default About;