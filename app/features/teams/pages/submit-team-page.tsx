import { Button } from "~/common/components/ui/button";
import { Hero } from "~/common/components/hero";
import { Form } from "react-router";
import { InputPair } from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";


const PRODUCT_STAGES = ["Idea", "MVP", "Beta", "Launched", "Scaling"];
const TEAM_SIZES = ["1", "2-5", "6-10", "11-20", "21-50", "50+"];
const EQUITY_RANGES = ["0-5%", "5-10%", "10-15%", "15-20%", "20-25%", "25%+"];

export const meta = () => {
  return [
    { title: "Submit Team | WeMake" },
    { name: "description", content: "Create a new team and invite makers" },
  ];
};

export default function SubmitTeamPage() {
  return (
    <div>
      <Hero 
        title="Create Team" 
        description="Create a new team and invite makers" 
      />
      <Form className="w-full px-4 md:px-8 lg:px-16 flex flex-col items-center gap-5">
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <InputPair
            id="productName"
            label="What is the name of your product?"
            description="(40 characters max)"
            name="productName"
            placeholder="i.e WeMake Platform"
            type="text"
            required
            maxLength={40}
            className="h-[72px]"
          />
          <SelectPair
            label="What is the stage of your product?"
            description="Select your product's current stage"
            name="productStage"
            required
            placeholder="Select product stage"
            options={PRODUCT_STAGES.map((stage) => ({ label: stage, value: stage }))}
            
          />
          <InputPair
            id="teamSize"
            label="What is the size of your team?"
            description="Enter the number of team members"
            name="teamSize"
            type="number"
            required
            min={1}
            max={100}
        
          />
          <InputPair
            id="equity"
            label="How much equity are you willing to give?"
            description="Enter the percentage (0-100)"
            name="equity"
            type="number"
            required
            min={0}
            max={100}
           
          />
          <InputPair
            id="roles"
            label="What roles are you looking for?"
            description="(400 characters max, separated by commas)"
            name="roles"
            placeholder="i.e Frontend Developer, Backend Developer, UI/UX Designer"
            type="text"
            required
            maxLength={400}
            textArea
        
          />
          <InputPair
            id="productDescription"
            label="What is the description of your product?"
            description="(1000 characters max)"
            name="productDescription"
            placeholder="Describe your product, its mission, and what makes it unique"
            type="text"
            required
            maxLength={1000}
            textArea
          
          />
        </div>
        <Button
          type="submit"
          className="w-full max-w-lg mt-10"
          size="lg"
        >
          Create Team
        </Button>
      </Form>
    </div>
  );
} 