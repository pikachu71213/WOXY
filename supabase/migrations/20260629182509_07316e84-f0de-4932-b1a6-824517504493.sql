
DROP POLICY "Anyone can submit a lead" ON public.leads;

CREATE POLICY "Anyone can submit a valid lead"
  ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(name) BETWEEN 1 AND 100
    AND length(phone) BETWEEN 6 AND 20
    AND (email IS NULL OR length(email) <= 255)
    AND (program IS NULL OR length(program) <= 60)
    AND (message IS NULL OR length(message) <= 2000)
    AND source = 'website_contact_form'
    AND status = 'new'
  );
