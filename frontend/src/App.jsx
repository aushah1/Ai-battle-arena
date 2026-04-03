import { useState, useCallback, useEffect } from "react";
import "./index.css";
import Header from "./components/Header";
import BattleView from "./components/BattleView";
import InputBar from "./components/InputBar";
import EmptyState from "./components/EmptyState";
import Footer from "./components/Footer";

const API_URL = "http://localhost:3000/api/battle";

// ─── Dummy Data ───
const DUMMY_BATTLES = [
  {
    id: 1,
    problem:
      "Design a highly scalable GraphQL schema for a real-time multiplayer combat system, optimizing for minimal latency and complex state synchronizations.",
    solution_1: `Here is a refined GraphQL schema optimized for high-concurrency multiplayer combat systems:

\`\`\`graphql
type CombatState {
  id: ID!
  tickRate: Int!
  players: [CombatPlayer!]!
  projectiles: [ActiveEntity!]!
}

subscription onStateUpdate($matchId: ID!) {
  matchSync(id: $matchId) {
    deltaEncoding
    timestamp
  }
}
\`\`\`

The schema utilizes subscription-based delta-encoding to minimize payload size during intense 60Hz tick cycles. Each state update only transmits the diff rather than the full game state, reducing bandwidth by up to 85%.

Key architectural decisions:
- **Delta encoding** over full state snapshots for real-time sync
- **Batched mutations** to group player actions within a single tick
- **Optimistic UI updates** with server reconciliation
- **Connection-aware quality scaling** that adjusts tick rate based on client latency`,

    solution_2: `My approach focuses on a partition-tolerant schema design with built-in conflict resolution:

\`\`\`graphql
type GameWorld {
  id: ID!
  shardId: String!
  entities: [Entity!]! @connection(keyArgs: ["shardId"])
  combatLog: [CombatEvent!]! @stream(initialCount: 50)
}

type Entity @key(fields: "id shardId") {
  id: ID!
  shardId: String!
  position: Vector3!
  health: Float!
  buffs: [StatusEffect!]!
}

mutation batchActions($tick: Int!, $actions: [ActionInput!]!) {
  processTick(tick: $tick, actions: $actions) {
    accepted
    corrections
    serverTick
  }
}
\`\`\`

This design leverages entity sharding for horizontal scalability. The \`@stream\` directive on combat logs enables incremental delivery, and the \`processTick\` mutation handles server-authoritative conflict resolution with client-side prediction corrections.

Additional optimizations include:
- **Entity interest management** — clients only subscribe to entities within their spatial partition
- **Predictive input buffering** with rollback netcode
- **Adaptive compression** based on entity proximity and relevance scoring`,

    judge: {
      solution_1_score: 8.2,
      solution_2_score: 9.5,
      solution_1_reasoning:
        "Efficient logic structure but failed to address the edge-case handling for high-concurrency requests in the boilerplate code. The delta-encoding approach is solid but lacks detail on conflict resolution when multiple clients submit contradicting state changes simultaneously.",
      solution_2_reasoning:
        "Exceptional security implementation and more idiomatic handling of the asynchronous data stream compared to Model A. The sharding strategy with spatial partitioning demonstrates a deeper understanding of production-scale multiplayer architectures.",
    },
    status: "complete",
  },
  {
    id: 2,
    problem:
      "Implement a rate limiter using the token bucket algorithm that supports distributed environments with Redis.",
    solution_1: `Here's a production-ready token bucket rate limiter using Redis:

\`\`\`javascript
class TokenBucketRateLimiter {
  constructor(redis, options) {
    this.redis = redis;
    this.maxTokens = options.maxTokens || 10;
    this.refillRate = options.refillRate || 1;
    this.key = options.key;
  }

  async consume(tokens = 1) {
    const now = Date.now();
    const result = await this.redis.eval(
      LUA_SCRIPT, 1, this.key,
      this.maxTokens, this.refillRate, now, tokens
    );
    return { allowed: result[0] === 1, remaining: result[1] };
  }
}
\`\`\`

The implementation uses a Lua script for atomic operations, ensuring thread safety in distributed environments. Tokens are lazily refilled on each request rather than using a background process.`,

    solution_2: `A distributed token bucket implementation with sliding window support:

\`\`\`typescript
export class DistributedRateLimiter {
  private readonly script = \`
    local key = KEYS[1]
    local capacity = tonumber(ARGV[1])
    local rate = tonumber(ARGV[2])
    local now = tonumber(ARGV[3])
    local requested = tonumber(ARGV[4])
    
    local bucket = redis.call('hmget', key, 'tokens', 'last_refill')
    local tokens = tonumber(bucket[1]) or capacity
    local last = tonumber(bucket[2]) or now
    
    local elapsed = (now - last) / 1000
    tokens = math.min(capacity, tokens + elapsed * rate)
    
    if tokens >= requested then
      tokens = tokens - requested
      redis.call('hmset', key, 'tokens', tokens, 'last_refill', now)
      redis.call('pexpire', key, math.ceil(capacity / rate) * 1000)
      return {1, tokens}
    end
    return {0, tokens}
  \`;

  async isAllowed(identifier: string): Promise<RateLimitResult> {
    const [allowed, remaining] = await this.redis.eval(
      this.script, 1, \`rl:\${identifier}\`,
      this.capacity, this.refillRate, Date.now(), 1
    );
    return { allowed: allowed === 1, remaining, retryAfter: allowed ? 0 : this.calculateRetry(remaining) };
  }
}
\`\`\`

Key features include automatic TTL management, retry-after header calculation, and support for weighted request costs across microservice boundaries.`,

    judge: {
      solution_1_score: 7.8,
      solution_2_score: 8.9,
      solution_1_reasoning:
        "Clean and concise implementation but references a LUA_SCRIPT variable without providing the actual script content. The lazy refill approach is correct but the solution lacks error handling and doesn't address TTL management for Redis keys.",
      solution_2_reasoning:
        "More complete implementation with the full Lua script inlined. Includes important production considerations like automatic key expiration, retry-after calculation, and weighted request costs. The TypeScript typing adds clarity to the interface contract.",
    },
    status: "complete",
  },
];

function App() {
  const [battles, setBattles] = useState(DUMMY_BATTLES);
  const [activeBattle, setActiveBattle] = useState(DUMMY_BATTLES[0]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (problem) => {
      if (!problem.trim() || isLoading) return;

      const battleId = Date.now();
      const newBattle = {
        id: battleId,
        problem: problem.trim(),
        solution_1: "",
        solution_2: "",
        judge: null,
        status: "loading",
      };

      setBattles((prev) => [newBattle, ...prev]);
      setActiveBattle(newBattle);
      setIsLoading(true);

      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ problem: problem.trim() }),
        });

        if (!res.ok) throw new Error("Failed to fetch battle results");

        const data = await res.json();
        const completedBattle = {
          ...newBattle,
          solution_1: data.solution_1,
          solution_2: data.solution_2,
          judge: data.judge,
          status: "complete",
        };

        setBattles((prev) =>
          prev.map((b) => (b.id === battleId ? completedBattle : b))
        );
        setActiveBattle(completedBattle);
      } catch (err) {
        console.error("Battle error:", err);
        const errorBattle = {
          ...newBattle,
          status: "error",
          error: err.message,
        };
        setBattles((prev) =>
          prev.map((b) => (b.id === battleId ? errorBattle : b))
        );
        setActiveBattle(errorBattle);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading]
  );

  return (
    <div className="h-screen flex flex-col bg-bg-deep overflow-hidden">
      <Header />

      <div className="flex-1 flex overflow-hidden">
        {/* ─── Sidebar: Battle List ─── */}
        <aside className="w-[260px] flex-shrink-0 border-r border-border-subtle bg-bg-base overflow-y-auto">
          <div className="p-4">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-3 px-2">
              Battle History
            </h2>
            <div className="flex flex-col gap-1">
              {battles.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setActiveBattle(b)}
                  className={`w-full text-left px-3 py-3 rounded-xl transition-all duration-200 cursor-pointer group ${activeBattle?.id === b.id
                    ? "bg-bg-elevated border border-border-neon"
                    : "hover:bg-bg-card border border-transparent"
                    }`}
                >
                  <p className={`text-xs font-medium leading-snug line-clamp-2 ${activeBattle?.id === b.id ? "text-text-primary" : "text-text-secondary"
                    }`}>
                    {b.problem}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    {b.status === "loading" ? (
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-neon-amber">
                        Processing…
                      </span>
                    ) : b.status === "error" ? (
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-red-400">
                        Error
                      </span>
                    ) : b.judge ? (
                      <>
                        <span className="text-[9px] tabular-nums font-bold text-neon-cyan">
                          {Math.max(b.judge.solution_1_score, b.judge.solution_2_score)}/10
                        </span>
                        <span className="text-[9px] text-text-muted">·</span>
                        <span className="text-[9px] text-text-muted">
                          {b.judge.solution_1_score > b.judge.solution_2_score
                            ? "Mistral wins"
                            : "Cohere wins"}
                        </span>
                      </>
                    ) : null}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ─── Main Area ─── */}
        <div className="flex-1 flex flex-col">
          {activeBattle ? (
            <BattleView battle={activeBattle} />
          ) : (
            <EmptyState />
          )}

          <InputBar onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
