import React from "react";
import {
  UploadCloudIcon,
  BrainCircuitIcon,
  MessageSquareTextIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Rest of the code remains the same */}
      {/* Hero Section */}
      <section className="text-center py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Chat with Your Documents
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Transform static PDFs into interactive knowledge bases using
            AI-powered analysis
          </p>
          <div className="flex gap-4 justify-center">
            <Button className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-full text-lg">
              Start Analyzing
              <UploadCloudIcon className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="px-8 py-4 rounded-full text-lg border-slate-300"
            >
              Try Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Supported Formats */}
      <div className="text-center py-8">
        <p className="text-sm text-slate-500 mb-4">Supported Formats</p>
        <div className="flex gap-4 justify-center">
          <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">
            PDF
          </span>
          <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">
            DOCX
          </span>
          <span className="px-3 py-1 bg-slate-100 rounded-full text-sm">
            TXT
          </span>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 py-16 max-w-7xl mx-auto">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="p-6 bg-white hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col h-full">
              <div className="mb-4 text-indigo-600">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-slate-800">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 mb-6 flex-grow">
                {feature.description}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Demo Preview */}
      <div className="max-w-3xl mx-auto px-8 py-16">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <MessageSquareTextIcon className="h-5 w-5 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold">Try Sample Interaction</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-600">
                User: What's the main conclusion of the study?
              </p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <p className="text-sm text-slate-600">
                AI: The study concludes that... [extracted from page 12]
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <ShieldCheckIcon className="h-12 w-12 text-indigo-600 mx-auto mb-6" />
          <p className="text-lg text-slate-600 mb-4">
            "We never store your documents. All files are processed in memory
            and permanently deleted after analysis."
          </p>
          <p className="text-sm text-slate-500">
            SOC 2 Type II Certified • GDPR Compliant
          </p>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-800">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.title} className="text-center">
                <div className="mb-4 flex justify-center text-indigo-600">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

const features = [
  {
    title: "Instant Answers",
    icon: <MessageSquareTextIcon className="h-8 w-8" />,
    description:
      "Ask natural language questions and get precise answers extracted directly from your documents",
  },
  {
    title: "Multi-Doc Analysis",
    icon: <UploadCloudIcon className="h-8 w-8" />,
    description:
      "Upload multiple documents and query across all files simultaneously",
  },
  {
    title: "Secure Processing",
    icon: <ShieldCheckIcon className="h-8 w-8" />,
    description:
      "Military-grade encryption with automatic document deletion after processing",
  },
];

const steps = [
  {
    title: "1. Upload Document",
    icon: <UploadCloudIcon className="h-10 w-10" />,
    description: "Drag & drop or select your PDF/DOCX files",
  },
  {
    title: "2. AI Processing",
    icon: <BrainCircuitIcon className="h-10 w-10" />,
    description: "Our AI analyzes and indexes document content",
  },
  {
    title: "3. Get Insights",
    icon: <MessageSquareTextIcon className="h-10 w-10" />,
    description: "Ask questions and receive citation-backed answers",
  },
];
