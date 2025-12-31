import { useState } from "react";
import { Calculator, Info, TrendingUp, Award, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

interface ScoreResult {
  kpsea: number;
  schoolBased: number;
  summative: number;
  total: number;
  grade: string;
  description: string;
  recommendation: string;
}

const KJSEACalculator = () => {
  const [kpseaScore, setKpseaScore] = useState<string>("");
  const [schoolBasedScore, setSchoolBasedScore] = useState<string>("");
  const [summativeScore, setSummativeScore] = useState<string>("");
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [error, setError] = useState<string>("");

  const calculateScore = () => {
    setError("");
    setResult(null);

    const kpsea = parseFloat(kpseaScore);
    const schoolBased = parseFloat(schoolBasedScore);
    const summative = parseFloat(summativeScore);

    // Validate inputs
    if (isNaN(kpsea) || isNaN(schoolBased) || isNaN(summative)) {
      setError("Please enter valid scores for all fields.");
      return;
    }

    if (kpsea < 0 || kpsea > 100 || schoolBased < 0 || schoolBased > 100 || summative < 0 || summative > 100) {
      setError("All scores must be between 0 and 100.");
      return;
    }

    // Calculate weighted scores according to KJSEA structure
    // KPSEA: 20%, School-Based: 20%, Summative: 60%
    const kpseaWeighted = (kpsea / 100) * 20;
    const schoolBasedWeighted = (schoolBased / 100) * 20;
    const summativeWeighted = (summative / 100) * 60;
    const total = kpseaWeighted + schoolBasedWeighted + summativeWeighted;

    // Determine grade and recommendations
    let grade: string;
    let description: string;
    let recommendation: string;

    if (total >= 80) {
      grade = "Exceeds Expectations (EE)";
      description = "Outstanding performance across all assessment areas.";
      recommendation = "Your child is likely to qualify for top-tier national schools and highly competitive pathways. Consider applying to Extra County and National schools in your preferred pathway.";
    } else if (total >= 65) {
      grade = "Meets Expectations (ME)";
      description = "Strong performance demonstrating solid competency mastery.";
      recommendation = "Your child has good chances for placement in quality boarding schools. Ensure balanced school selection across county and extra-county options.";
    } else if (total >= 50) {
      grade = "Approaches Expectations (AE)";
      description = "Adequate performance with room for improvement.";
      recommendation = "Focus on county and sub-county schools with your preferred pathway. Consider both boarding and day school options for better placement chances.";
    } else {
      grade = "Below Expectations (BE)";
      description = "Performance indicates need for additional support.";
      recommendation = "Prioritize day schools and focus on pathways aligned with your child's strengths. Consider TVET pathway options which offer excellent career prospects.";
    }

    setResult({
      kpsea: kpseaWeighted,
      schoolBased: schoolBasedWeighted,
      summative: summativeWeighted,
      total,
      grade,
      description,
      recommendation
    });
  };

  const resetCalculator = () => {
    setKpseaScore("");
    setSchoolBasedScore("");
    setSummativeScore("");
    setResult(null);
    setError("");
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 65) return "bg-blue-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="shadow-maroon border-t-4 border-t-accent">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
            <Calculator className="w-6 h-6 text-accent" />
          </div>
          <div>
            <CardTitle className="text-2xl">KJSEA Score Estimator</CardTitle>
            <CardDescription>
              Estimate your child's KJSEA performance based on their assessment scores
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert className="bg-blue-500/10 border-blue-500/30">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertDescription className="text-sm">
            This calculator provides an <strong>estimate</strong> based on the official KJSEA weighting: 
            KPSEA (20%) + School-Based Assessment (20%) + Grade 9 Summative Exam (60%). 
            Actual results may vary based on moderation and scaling by KNEC.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* KPSEA Score */}
          <div className="space-y-2">
            <Label htmlFor="kpsea" className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/30">
                20%
              </Badge>
              KPSEA Score
            </Label>
            <Input
              id="kpsea"
              type="number"
              min="0"
              max="100"
              placeholder="0 - 100"
              value={kpseaScore}
              onChange={(e) => setKpseaScore(e.target.value)}
              className="text-lg"
            />
            <p className="text-xs text-muted-foreground">
              Grade 6 examination score (Kenya Primary School Education Assessment)
            </p>
          </div>

          {/* School-Based Assessment */}
          <div className="space-y-2">
            <Label htmlFor="school-based" className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
                20%
              </Badge>
              School-Based Assessment
            </Label>
            <Input
              id="school-based"
              type="number"
              min="0"
              max="100"
              placeholder="0 - 100"
              value={schoolBasedScore}
              onChange={(e) => setSchoolBasedScore(e.target.value)}
              className="text-lg"
            />
            <p className="text-xs text-muted-foreground">
              Average of Grades 7 & 8 continuous assessments, projects, and portfolios
            </p>
          </div>

          {/* Summative Exam */}
          <div className="space-y-2">
            <Label htmlFor="summative" className="flex items-center gap-2">
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                60%
              </Badge>
              Grade 9 Summative Exam
            </Label>
            <Input
              id="summative"
              type="number"
              min="0"
              max="100"
              placeholder="0 - 100"
              value={summativeScore}
              onChange={(e) => setSummativeScore(e.target.value)}
              className="text-lg"
            />
            <p className="text-xs text-muted-foreground">
              End of Grade 9 examination (expected or estimated score)
            </p>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex gap-4">
          <Button 
            onClick={calculateScore} 
            className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Estimate
          </Button>
          <Button 
            onClick={resetCalculator} 
            variant="outline"
            className="flex-1"
          >
            Reset
          </Button>
        </div>

        {result && (
          <div className="space-y-6 pt-6 border-t border-border">
            {/* Score Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-blue-500/10 border-blue-500/30">
                <CardContent className="pt-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">KPSEA Contribution</p>
                  <p className="text-2xl font-bold text-blue-600">{result.kpsea.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">out of 20</p>
                </CardContent>
              </Card>

              <Card className="bg-green-500/10 border-green-500/30">
                <CardContent className="pt-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">School-Based</p>
                  <p className="text-2xl font-bold text-green-600">{result.schoolBased.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">out of 20</p>
                </CardContent>
              </Card>

              <Card className="bg-accent/10 border-accent/30">
                <CardContent className="pt-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Summative Exam</p>
                  <p className="text-2xl font-bold text-accent">{result.summative.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">out of 60</p>
                </CardContent>
              </Card>

              <Card className="bg-primary/10 border-primary/30">
                <CardContent className="pt-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Total Score</p>
                  <p className="text-3xl font-bold text-primary">{result.total.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground">out of 100</p>
                </CardContent>
              </Card>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Overall Performance</span>
                <span className="font-semibold">{result.total.toFixed(1)}%</span>
              </div>
              <div className="h-4 bg-secondary rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getProgressColor(result.total)} transition-all duration-500`}
                  style={{ width: `${result.total}%` }}
                />
              </div>
            </div>

            {/* Grade and Recommendations */}
            <Card className="shadow-maroon">
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Estimated Grade: {result.grade}</h4>
                    <p className="text-muted-foreground">{result.description}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-4 border-t border-border">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Placement Recommendation</h4>
                    <p className="text-muted-foreground">{result.recommendation}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-4 border-t border-border">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Tips for Improvement</h4>
                    <ul className="text-muted-foreground text-sm space-y-1">
                      {result.total < 80 && (
                        <>
                          <li>• Focus on consistent performance in continuous assessments</li>
                          <li>• Practice past papers and mock examinations for Grade 9</li>
                          <li>• Seek extra help in challenging subjects early</li>
                          <li>• Maintain a balanced study schedule with regular breaks</li>
                        </>
                      )}
                      {result.total >= 80 && (
                        <>
                          <li>• Maintain excellent performance and stay consistent</li>
                          <li>• Explore leadership and co-curricular opportunities</li>
                          <li>• Research top schools for your preferred pathway</li>
                          <li>• Consider scholarship opportunities at premier schools</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Grading Scale Reference */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">80-100</p>
                <p className="font-semibold text-green-600 text-sm">Exceeds Expectations</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">65-79</p>
                <p className="font-semibold text-blue-600 text-sm">Meets Expectations</p>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">50-64</p>
                <p className="font-semibold text-yellow-600 text-sm">Approaches Expectations</p>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
                <p className="text-xs text-muted-foreground mb-1">0-49</p>
                <p className="font-semibold text-red-600 text-sm">Below Expectations</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KJSEACalculator;
