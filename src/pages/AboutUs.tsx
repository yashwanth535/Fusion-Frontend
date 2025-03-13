import React from 'react';
import { ChefHat } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white-100 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="startup-form hover:shadow-xl">
          <div className="text-center mb-8">
            <div className="bg-primary-100 w-20 h-20 rounded-full flex-center mx-auto mb-4 shadow-md">
              <ChefHat className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-30-bold">About Flavour Fusion</h1>
            <p className="text-16-medium text-black-100 mt-2">
              Our story, mission, and the team behind the recipes
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-24-bold text-black mb-4">Our Story</h2>
              <p className="text-16-regular text-black-100">
                Flavour Fusion was born out of a passion for culinary exploration and a desire to make cooking accessible to everyone. Founded in 2025, our platform brings together food enthusiasts, home cooks, and professional chefs to share, discover, and create amazing recipes from around the world.
              </p>
            </section>

            <section>
              <h2 className="text-24-bold text-black mb-4">Our Mission</h2>
              <p className="text-16-regular text-black-100">
                We believe that good food brings people together. Our mission is to inspire culinary creativity, promote diverse food cultures, and make cooking an enjoyable experience for everyone, regardless of their skill level. Through our AI-powered recipe creation and vast collection of community recipes, we aim to revolutionize how people approach cooking at home.
              </p>
            </section>


            <section>
              <h2 className="text-24-bold text-black mb-4">Our Values</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-primary-100 rounded-full p-2 mr-3 mt-1">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-18-bold text-black mb-1">Innovation</h3>
                    <p className="text-16-regular text-black-100">We constantly push the boundaries of what's possible in recipe creation and culinary technology.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary-100 rounded-full p-2 mr-3 mt-1">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-18-bold text-black mb-1">Inclusivity</h3>
                    <p className="text-16-regular text-black-100">We celebrate diverse food cultures and make cooking accessible to everyone.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary-100 rounded-full p-2 mr-3 mt-1">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-18-bold text-black mb-1">Quality</h3>
                    <p className="text-16-regular text-black-100">We're committed to providing reliable, tested recipes that deliver exceptional results.</p>
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 