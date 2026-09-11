# Synthetic merge-queue pilot

Disposable public test fixture. No application code, private data, secrets,
production connections, or product Git history is included.

Two independent JSON contributions must sum to at most 100. This catches a
semantic integration failure even when two changes merge without textual conflict.

Run: node --test verify.test.mjs && node verify.mjs

Planned queue acceptance: compatible concurrent PRs; individually green but
incompatible combined PRs; an individually failing PR; a textual conflict.
Baseline CI success is NOT evidence that Mergify has passed these scenarios.
No deployment, VM or Studio integration is configured in this repository.
