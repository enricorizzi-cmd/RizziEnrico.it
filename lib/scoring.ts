export function calculateLeadScore(
  sizeEmployees?: number,
  revenueRange?: string,
  mainProblem?: string
): number {
  let score = 0;

  // Size scoring (9-200 employees target)
  if (sizeEmployees) {
    if (sizeEmployees >= 9 && sizeEmployees <= 200) {
      score += 30;
    } else if (sizeEmployees >= 5 && sizeEmployees < 9) {
      score += 15;
    } else if (sizeEmployees > 200) {
      score += 10;
    }
  }

  // Revenue range scoring
  if (revenueRange) {
    const revenueMap: Record<string, number> = {
      '100k-500k': 10,
      '500k-1M': 15,
      '1M-5M': 20,
      '5M-10M': 25,
      '10M+': 20,
    };
    score += revenueMap[revenueRange] || 5;
  }

  // Problem relevance scoring
  if (mainProblem) {
    const problemKeywords = [
      'organizzazione',
      'processi',
      'kpi',
      'controllo',
      'crescita',
      'gestione',
      'persone',
      'passaggio',
      'generazionale',
    ];
    const problemLower = mainProblem.toLowerCase();
    const matches = problemKeywords.filter((keyword) =>
      problemLower.includes(keyword)
    ).length;
    score += matches * 5;
  }

  return Math.min(score, 100);
}

