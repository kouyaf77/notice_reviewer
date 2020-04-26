import * as core from '@actions/core';
import * as github from '@actions/github';
import { WebhookPayload } from '@actions/github/lib/interfaces';
import { IncomingWebhook } from '@slack/webhook';

interface Option {
    readonly slack_hook_url: string;
}

async function getOption(): Promise<Option> {
    return {
        slack_hook_url: core.getInput('slack_hook_url', { required: true })
    }
}

async function sendSlack(option: Option) {
    const url = option.slack_hook_url;
    const webhook = new IncomingWebhook(url);

    const assignees = github.context.payload.pull_request?.assignees

    await webhook.send({
        text: 'I\'ve got news for you...',
    });
}

async function run() {
    try {
        const option = await getOption();
        await sendSlack(option);
    } catch(error) {
        core.error(error.message)
    }
}

run();