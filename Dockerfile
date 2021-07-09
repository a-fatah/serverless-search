FROM getmeili/meilisearch as local

ENTRYPOINT ["tini", "--"]
CMD     ./meilisearch

FROM local

# In production we copy in the dump data, seeding the index at build time
# Dumps: https://docs.meilisearch.com/reference/api/dump.html
COPY ./dumps /dumps

ENV     MEILI_HTTP_ADDR 0.0.0.0:7700
EXPOSE  7700/tcp

ENTRYPOINT ["tini", "--"]

CMD ["./meilisearch", "--import-dump", "dumps/latest.dump"]