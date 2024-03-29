import React from "react";
import { useState } from "react";

//Lifting the State Up
const Section = ({ title, description, isVisible, setIsVisible }) => {
  return (
    //accordion component //F&Q section kind thing
    <div className="border border-amber-400 m-2 p-2">
      <h3 className="font-bold">{title} </h3>
      {isVisible ? (
        <button
          className=" cursor-pointer px-2"
          onClick={() => setIsVisible(null)}
        >
          <i className="fa-solid fa-caret-up fa-caret-up bg-red-500 rounded-lg text-white px-2 py-1"></i>
        </button>
      ) : (
        <button
          className=" cursor-pointer px-2"
          onClick={() => setIsVisible(title)}
        >
          <i className="fa-solid fa-caret-down bg-red-500 rounded-lg text-white px-2 py-1"></i>
        </button>
      )}
      {
        // wrapping it inside { } so we can use it as js
        isVisible && <p>{description}</p>
      }
    </div>
  );
};
const Instamart = () => {
  const [visibleSection, setIsVisibleSection] = useState("whyYumBite");
  return (
    <div>
      {/* Controlled accordion Component */}
      <Section
        title={"Why Choose YumBite Fooods ?"}
        description={
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
        }
        isVisible={visibleSection === "Why Choose YumBite Fooods ?"}
        setIsVisible={setIsVisibleSection}
      />

      <Section
        title={"Most Famous Restaurants in Goa?"}
        description={
          "voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores rep"
        }
        isVisible={visibleSection === "Most Famous Restaurants in Goa?"}
        setIsVisible={setIsVisibleSection}
      />

      <Section
        title={"Cancel order & Refund Policy?"}
        description={
          "voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores rep"
        }
        isVisible={visibleSection === "Cancel order & Refund Policy?"}
        setIsVisible={setIsVisibleSection}
      />
    </div>
  );
};
export default Instamart;
