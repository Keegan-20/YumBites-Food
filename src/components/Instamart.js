import React from "react";
import { useState } from "react";

//reuseable component
const Section = ({title,description}) => {
 const [isVisible,setIsVisible] = useState(false);
    return (
        <div className="border border-amber-400 m-2 p2">
            <h3 className="font-bold">{title}</h3>
            <button onClick={setIsVisible(true)} >Show</button>
            {isVisible && <p>description</p>}
        </div>
    );
};
const Instamart = () => {
    return (
        <div>
            <Section
            title={"Why Choose YumBite Fooods ?"} 
            description={"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."}
            />

<Section title={"Most Famous Restaurants in Goa?"}
description={" voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores rep"}
/>

        </div>
    );
}
export default Instamart;