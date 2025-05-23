import React, { useState } from "react";
import { Sparkles, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { AIChatSession } from "@/Services/AiModel";
import { updateThisResume } from "@/Services/resumeAPI";

const prompt =
  "Job Title: {jobTitle} , Depends on job title give me list of summary for 3 experience levels (Senior Level, Mid Level, and Fresher level) in 3-4 lines in array format, with summary and experience_level fields in JSON format. Example: [{\"experience_level\": \"Senior Level\", \"summary\": \"...\"}, ...]";

function Summary({ resumeInfo, enanbledNext, enanbledPrev }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(resumeInfo?.summary || "");
  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([]);
  const { resume_id } = useParams();

  const handleInputChange = (e) => {
    enanbledNext(false);
    enanbledPrev(false);
    dispatch(
      addResumeData({
        ...resumeInfo,
        [e.target.name]: e.target.value,
      })
    );
    setSummary(e.target.value);
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    
    const data = {
      data: { summary },
    };

    if (resume_id) {
      updateThisResume(resume_id, data)
        .then(() => {
          toast.success("Resume Updated");
        })
        .catch((error) => {
          toast.error(`Error updating resume: ${error.message}`);
        })
        .finally(() => {
          enanbledNext(true);
          enanbledPrev(true);
          setLoading(false);
        });
    }
  };

  const setSummaryHandler = (summaryText) => {
    dispatch(
      addResumeData({
        ...resumeInfo,
        summary: summaryText,
      })
    );
    setSummary(summaryText);
  };

  const generateSummaryFromAI = async () => {
    setLoading(true);
    
    if (!resumeInfo?.jobTitle) {
      toast.warning("Please add Job Title first");
      setLoading(false);
      return;
    }

    const PROMPT = prompt.replace("{jobTitle}", resumeInfo.jobTitle);
    
    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      
      try {
        const parsedResult = JSON.parse(result.response.text());
        
        if (Array.isArray(parsedResult) && parsedResult.length > 0) {
          setAiGeneratedSummaryList(parsedResult);
          toast.success("Summary suggestions generated");
        } else {
          throw new Error("AI response format is invalid");
        }
      } catch (parseError) {
        console.error("Failed to parse AI response:", parseError);
        toast.error("Failed to process AI response. Please try again.");
      }
    } catch (error) {
      console.error("AI generation error:", error);
      toast.error(`AI generation failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0f1117]">
      <div className="p-5 shadow-lg text-white rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add summary for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summary</label>
            <Button
              variant="outline"
              onClick={generateSummaryFromAI}
              type="button"
              size="sm"
              className="border-primary text-primary flex gap-2"
              disabled={loading}
            >
              {loading ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Generate from AI
                </>
              )}
            </Button>
          </div>
          <Textarea
            name="summary"
            className="mt-5 bg-black text-white h-40"
            required
            value={summary}
            onChange={handleInputChange}
            placeholder="Enter your professional summary here..."
          />
          <div className="mt-4 text-white flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {Array.isArray(aiGeneratedSummaryList) && aiGeneratedSummaryList.length > 0 && (
        <div className="my-5 text-white mt-1">
          <h2 className="font-bold text-lg ml-5">AI Suggestions</h2>
          {aiGeneratedSummaryList.map((item, index) => (
            <div
              key={`summary-${index}`}
              onClick={() => {
                enanbledNext(false);
                enanbledPrev(false);
                setSummaryHandler(item?.summary);
              }}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
            >
              <h2 className="border-gray-500 border-2 rounded-md p-2 font-bold my-1 text-primary">
                {item?.experience_level || "Professional"}
              </h2>
              <p className="border-gray-500 border-2 rounded-md p-2">
                {item?.summary || "No summary available"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summary;