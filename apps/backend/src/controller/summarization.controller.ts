import { Request, Response } from 'express';

import { generateOpenAiOutput } from '../core/openai';
import { IUser, Summarization } from '../model';

/**
 * @summarizes the text
 */
export const generateSummarization = async (req: Request, res: Response) => {
  const { article } = req.body;
  try {
    const [summary, rawInsights] = await Promise.all([
      generateOpenAiOutput(`Summarize this text: "${article}"`),
      generateOpenAiOutput(
        `Generate insights from this text, each insight on a separate line: "${article}"`,
      ),
    ]);
    const insights = rawInsights.split('\n');

    const { id: userId } = req.user as IUser;
    const summarizedData = new Summarization({
      user: userId,
      article,
      summary,
      insights,
    });

    await summarizedData.save();

    res.json({ summary, insights });
  } catch (error) {
    console.error('Error summarizing text:', error);
    res.status(500).json({ error: 'Failed to summarize text' });
  }
};

/**
 * @returns the list of summarizations
 */
export const getSummarizationList = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.user as IUser;
    const summarizations = await Summarization.find({
      user: userId,
    }).sort({ createdAt: -1 });

    res.json(summarizations);
  } catch (error) {
    console.error('Error retrieving summarizations:', error);
    res.status(500).json({ error: 'Failed to retrieve summarizations' });
  }
};
