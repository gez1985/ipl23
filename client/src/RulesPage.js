import React, { useEffect } from "react";
import ComponentNav from "./ComponentNav";
import PageTitle from "./PageTitle";
import MobileComponentNav from "./MobileComponentNav";

export default function RulesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <MobileComponentNav />
      <ComponentNav />
      <PageTitle title="Rules" />
      <div className="standard-width-container">
        <div className="rules-section">
          <div className="rules-heading">1. The Draft System</div>
          <ul className="rules-ul">
            <li>
              Squads are selected using a draft system similar to the one used
              in the NFL. Any available player can be picked provided the
              selection does not contravene squad restrictions.
            </li>
            <li>
              The draft order is determined randomly, shortly before the start
              of the draft. In the first round managers pick in ascending order.
              In each subsequent round, the picking order is reversed. For
              example, in round one the pick order for five managers would be 1,
              2, 3, 4, 5. In round two it would be 5, 4, 3, 2, 1. Managers with
              first pick and last pick will have two picks in a row with the
              exception of the first round.
            </li>
            <li>
              In the initial draft managers will pick a squad of 13 players. In
              the semi-final and final drafts managers will pick 12 players.
            </li>
            <li>
              In the initial draft No more than three players can be selected
              from the same team. In the semi-final draft the limit is five and
              in the final draft there is no limit.
            </li>
            <li>
              Picks are subject to restrictions on the minimum and maximum
              number of players picked in each position. These are different for
              the first two drafts and the final draft.
              <table className="rules-table">
                <thead>
                  <tr>
                    <th rowSpan="2"></th>
                    <th colSpan="2">Initial Draft</th>
                    <th colSpan="2">Semi Draft</th>
                    <th colSpan="2">Final Draft</th>
                  </tr>
                  <tr>
                    <td>Min</td>
                    <td>Max</td>
                    <td>Min</td>
                    <td>Max</td>
                    <td>Min</td>
                    <td>Max</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Batters</td>
                    <td>3</td>
                    <td>6</td>
                    <td>3</td>
                    <td>5</td>
                    <td>No min</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>All Rounders</td>
                    <td>2</td>
                    <td>4</td>
                    <td>1</td>
                    <td>4</td>
                    <td>No min</td>
                    <td>4</td>
                  </tr>
                  <tr>
                    <td>Wicketkeepers</td>
                    <td>1</td>
                    <td>2</td>
                    <td>No min</td>
                    <td>3</td>
                    <td>No min</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <td>Bowlers</td>
                    <td>3</td>
                    <td>6</td>
                    <td>3</td>
                    <td>5</td>
                    <td>No min</td>
                    <td>5</td>
                  </tr>
                </tbody>
              </table>
            </li>
          </ul>
        </div>
        <div className="rules-section">
          <div className="rules-heading">2. The Scoring System</div>
          <ul className="rules-ul">
            <li>
              After the initial draft a manager's league total will be decided
              by the points scored by their best eleven players that comply with
              role restrictions. The best eleven must include a minimum of three
              batters, one all rounder, one wicketkeeper and three bowlers. The
              best eleven cannot include more than five batters, three all
              rounders, two wicketkeepers and five bowlers. The best eleven and
              total league points will be automatically selected from the
              manager's squad.
            </li>
            <li>
              In the semi-finals and final the best elevens will be
              automatically selected. No role restrictions will be included in
              the final, the top scoring players will be selected regardless of
              role.
            </li>
            <li>
              The table below shows how players can score points from each
              fixture:
            </li>
          </ul>
          <ul className="rules-ul">
            <li>
              All players actively involved in a game score 4 points. This
              includes starting players and substitutes who make a positive
              point scoring contribution such as a catch or run out.
            </li>
          </ul>
          <div className="rules-heading">Batting Points:</div>
          <ul className="rules-ul">
            <li>1 point for every run scored.</li>
            <li>1 bonus point for every boundary (4 runs).</li>
            <li>2 bonus points for every six.</li>
            <li>
              -5 points for a duck with -10 for a golden duck (does not apply to
              bowlers, not cumulative).
            </li>
            <li>
              Strike rate bonus if 10 or more deliveries faced (rounded down):
            </li>
            <table className="rules-table">
              <tbody>
                <tr>
                  <td>Less than 50</td>
                  <td>-6</td>
                </tr>
                <tr>
                  <td>50-59</td>
                  <td>-4</td>
                </tr>
                <tr>
                  <td>60-79</td>
                  <td>-2</td>
                </tr>
                <tr>
                  <td>120-139</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>140-169</td>
                  <td>4</td>
                </tr>
                <tr>
                  <td>170-199</td>
                  <td>6</td>
                </tr>
                <tr>
                  <td>200+</td>
                  <td>8</td>
                </tr>
              </tbody>
            </table>
            <p>
              <i>
                *For example, a player with a strike rate of 139.8 would score 2
                bonus points.
              </i>
            </p>
            <li>
              Total score bonus (strike rate must be at least 100, not
              cumulative):
            </li>
            <table className="rules-table">
              <tbody>
                <tr>
                  <td>30-49</td>
                  <td>4</td>
                </tr>
                <tr>
                  <td>50-74</td>
                  <td>6</td>
                </tr>
                <tr>
                  <td>75-99</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>100+</td>
                  <td>15</td>
                </tr>
              </tbody>
            </table>
          </ul>
          <div className="rules-heading">Bowling Points:</div>
          <ul className="rules-ul">
            <li>2 points for bowling an over.</li>
            <li>20 points for every wicket taken (not including run outs).</li>
            <li>15 points for a maiden over.</li>
            <li>Economy bonus:</li>
            <table className="rules-table">
              <tbody>
                <tr>
                  <td>Less than 4</td>
                  <td>10 points per over</td>
                </tr>
                <tr>
                  <td>4-4.5</td>
                  <td>8 points per over</td>
                </tr>
                <tr>
                  <td>4.5-5</td>
                  <td>6 points per over</td>
                </tr>
                <tr>
                  <td>5-6</td>
                  <td>4 points per over</td>
                </tr>
                <tr>
                  <td>6-7</td>
                  <td>2 points per over</td>
                </tr>
                <tr>
                  <td>9-10</td>
                  <td>-1 points per over</td>
                </tr>
                <tr>
                  <td>10-11</td>
                  <td>-2 points per over</td>
                </tr>
                <tr>
                  <td>11-12</td>
                  <td>-3 points per over</td>
                </tr>
                <tr>
                  <td>-12 or more</td>
                  <td>-4 points per over</td>
                </tr>
              </tbody>
            </table>
            <p>
              <i>
                *Players on the boundary get the lower of the points. For
                example, a player with an economy of 4.5 gets 6 points per over.
                A player with an economy of 10 would get -2 points per over.
              </i>
            </p>
            <li>Total wickets bonus (not cumulative):</li>
            <table className="rules-table">
              <tbody>
                <tr>
                  <td>3</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>15</td>
                </tr>
                <tr>
                  <td>5+</td>
                  <td>20</td>
                </tr>
              </tbody>
            </table>
          </ul>
          <div className="rules-heading">
            Fielding Points (including substitute fielders):
          </div>
          <ul className="rules-ul">
            <li>10 points for a catch.</li>
            <li>6 points for a part run out.</li>
            <li>12 points for a full run out (direct hit).</li>
            <li>12 points for a stumping.</li>
          </ul>
        </div>
        <div className="rules-section">
          <div className="rules-heading">3. The Semi-Finals and Final</div>
          <ul className="rules-ul">
            <li>
              At the end of the super 12s, the four managers with the highest
              points total will qualify for the semi-finals. In the event of a
              tie, league order will be decided by the manager with the most
              catches scored by the entire squad. If this is also a tie, the
              fall back criteria will be: most runs, most wickets, most run
              outs, most appearances played and finally a coin toss.
            </li>
            <li>
              Before the semi-final begins, qualified players will be redrafted
              by the qualified managers automatically from shortlists. Should
              qualifying players be in the qualifying manager's squads, managers
              can choose to carry them through to their semi-final squad or
              discard them back into the available player pool. Their turn or
              pick position will not be affected. The semi-final draft order
              will be determined by league position at the end of the super 12s.
              The manager with the most points will get first pick. The order
              will reverse each round as per the original draft.
            </li>
            <li>
              The second round will be a head to head between the top four
              managers. First place will play fourth with second against third.
            </li>
            <li>
              The winning criteria is points scored in the semi-finals. If this
              is a tie, the fall back criteria will be: points scored to date
              from the first draft (including semi-final games), catches, runs,
              wickets, run outs, appearances and finally a coin toss.
            </li>
            <li>
              The winning semi-final managers will qualify for the Cricket Draft
              Final.
            </li>
            <li>
              Before the final beings, qualified players will be redrafted by
              the qualified managers. Should qualifying players be in the
              qualifying manager's squads, managers can choose to carry them
              through to their final squad or discard them back into the
              available player pool. Their turn or pick position will not be
              affected. The final draft order will be determined by the total
              points scored by the squads selected in the first draft. The
              manager with the most points will get first pick. The picks will
              alternate between the two managers.
            </li>
            <li>
              The winning criteria is points scored in the final. If this is a
              tie, the fall back criteria will be: points scored to date from
              the first draft (including semi-final and final games), catches,
              runs, wickets, run outs, appearances and finally a coin toss.
            </li>
          </ul>
        </div>
        <div className="rules-section">
          <div className="rules-heading">4. Competition Prizes</div>
          <ul className="rules-ul">
            <li>
              The Cricket Draft is a not for profit competition with all entry
              fees included in the prize purse. If more then ten players take
              part the prize money will be divided as below. If ten or less take
              part there will be no prizes for most wickets and most runs. If
              less than eight managers enter, there will be no prizes for losing
              semi-finalists.
            </li>
            <table className="rules-table">
              <tbody>
                <tr>
                  <td>Winner</td>
                  <td>4 parts</td>
                </tr>
                <tr>
                  <td>Runner up</td>
                  <td>2 parts</td>
                </tr>
                <tr>
                  <td>Losing semi-finalist</td>
                  <td>1 part</td>
                </tr>
                <tr>
                  <td>Most runs (original squads)</td>
                  <td>1 part</td>
                </tr>
                <tr>
                  <td>Most wickets (original squads)</td>
                  <td>1 part</td>
                </tr>
              </tbody>
            </table>
            <li>
              The prizes for most wickets and most runs will only be between
              managers who do not qualify for the semi-finals and will include
              all 13 squad players.
            </li>
            <li>
              It is an unwritten part of the cricket draft constitution that the
              manager that finishes bottom of the table sends a card of
              congratulations to the winner along with a gift (suggested value
              £10 - £20).
            </li>
            <li>
              Participants may request a certificate of participation within 72
              hours of the conclusion of the final. Requests should be addressed
              to the manager that finished at the bottom of the league table.
              When produced, certificates can be sent electronically if
              neccessary. Certificates must be of an appropriate nature.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
