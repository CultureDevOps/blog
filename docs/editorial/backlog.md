# Culture DevOps — backlog éditorial OPS-011

Proposition de cadence : deux articles par mois, de novembre 2026 à février 2027. Les dates sont des cibles de relecture et de publication manuelle après validation, sans automatisation de diffusion.

| Cible      | Sujet                                                                       | Angle et démonstration                                         | État                    |
| ---------- | --------------------------------------------------------------------------- | -------------------------------------------------------------- | ----------------------- |
| 2026-11-10 | GitLab CI/CD : tester une application Python sans déclencher de déploiement | Trois tests exécutables, workflow et contrôle des intégrations | Brouillon dans cette PR |
| 2026-11-24 | Variables GitLab CI : protéger les secrets et limiter leur exposition       | Portée, branches protégées, exemples avec valeurs fictives     | À préparer              |
| 2026-12-08 | Construire une image Docker reproductible                                   | Multi-stage, utilisateur non root, versions et digest vérifiés | À préparer              |
| 2026-12-22 | GitLab CI : cache et artefacts, deux usages différents                      | Comparaison sur une petite application, durée et accès         | À préparer              |
| 2027-01-12 | Terraform : relire un plan avant toute application                          | Exemple local, état et risques de remplacement                 | À préparer              |
| 2027-01-26 | Observer une application avec des logs utiles                               | Requêtes, erreurs et masquage des données sensibles            | À préparer              |
| 2027-02-09 | Sauvegarder ne suffit pas : tester une restauration                         | Démonstration locale sur données synthétiques                  | À préparer              |
| 2027-02-23 | Déploiement progressif et retour arrière                                    | Scénario de démonstration isolé, critères de succès            | À préparer              |

## Processus de relecture

1. Sélectionner le sujet suivant et préciser le lecteur, le résultat attendu et les prérequis.
2. Préparer un brouillon français avec `draft: true`, des exemples reproductibles et les références officielles consultées.
3. Exécuter les exemples et le build ; relire les liens, les versions, les droits, les coûts et les effets automatiques. Conserver la preuve dans la PR.
4. Relire le fond technique puis la mise en page sur mobile et ordinateur dans une Preview autorisée. Le propriétaire valide l’article.
5. Après accord distinct de publication, passer `draft` à `false`, vérifier le diff final, fusionner et contrôler la page publique, le RSS et le sitemap.

Préparation possible à automatiser ultérieurement : vérification du frontmatter, exemples, liens et build dans les PR. Aucune publication planifiée ni ressource payante n’est créée par ce backlog.

## Reprise du 1er novembre 2026

Les archives préparées dans l’ancienne conversation (`/mnt/data/OPS-011-culturedevops-draft.patch` et `.zip`) ne sont pas accessibles sur le poste de reprise. Le brouillon et ce calendrier sont reconstitués à partir du sujet et du périmètre conservés ; ils ne sont pas présentés comme des copies exactes des fichiers précédents.
