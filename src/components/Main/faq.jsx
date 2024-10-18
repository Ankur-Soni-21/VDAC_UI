import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import React from "react";

function Faq({isDarkMode}) {
  return (
    <Card className={isDarkMode ? "bg-[#1c1c1c] text-gray-100" : ""}>
      <CardHeader>
        <CardTitle>FAQ</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">How do I download a video?</h3>
            <p className={isDarkMode ? "text-gray-300" : ""}>
              Simply paste the video URL into the input field and click the
              Download button.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">
              What file formats are supported for conversion?
            </h3>
            <p className={isDarkMode ? "text-gray-300" : ""}>
              We support a wide range of video and audio formats. You can
              convert to MP4, MP3, WAV, and more.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">
              How accurate are the generated transcripts?
            </h3>
            <p className={isDarkMode ? "text-gray-300" : ""}>
              Our transcription service uses advanced AI to provide highly
              accurate results, but may not be perfect for all accents or audio
              qualities.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Faq;
